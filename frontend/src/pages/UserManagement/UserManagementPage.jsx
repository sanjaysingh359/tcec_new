import { useState, useEffect } from 'react';
import { Button, Table, Tag, Modal, Form, Input, Select, Popconfirm, message, Space, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';
import api from '../../services/api';

const { Option } = Select;

export default function UserManagementPage() {
  const [users,      setUsers]      = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editUser,   setEditUser]   = useState(null); // null = create, else = user object
  const [saving,     setSaving]     = useState(false);
  const [form] = Form.useForm();

  const selectedRole = Form.useWatch('role', form);

  const loadUsers = () => {
    setLoading(true);
    api.get('/admin/users')
      .then(r => setUsers(r.data?.data || []))
      .catch(() => message.error('Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
    api.get('/admin/institutes')
      .then(r => setInstitutes(r.data?.data || []))
      .catch(() => {});
  }, []);

  const openCreate = () => {
    setEditUser(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    form.setFieldsValue({
      userId:   user.userId,
      role:     user.role,
      instId:   user.instId || undefined,
      password: '',
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const vals = await form.validateFields();
      setSaving(true);
      if (editUser) {
        await api.put(`/admin/users/${editUser.userId}`, {
          role:     vals.role,
          password: vals.password || '',
          instId:   vals.instId || '',
        });
        message.success('User updated successfully');
      } else {
        await api.post('/admin/users', {
          userId:   vals.userId,
          password: vals.password,
          role:     vals.role,
          instId:   vals.instId || '',
        });
        message.success('User created successfully');
      }
      setModalOpen(false);
      loadUsers();
    } catch (err) {
      if (err?.response?.data?.message) {
        message.error(err.response.data.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      message.success('User deleted');
      loadUsers();
    } catch (err) {
      message.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const columns = [
    {
      title: '#', dataIndex: 'idx', key: 'idx', width: 50,
      render: (_, __, i) => <span style={{ color: '#888', fontSize: 12 }}>{i + 1}</span>,
    },
    {
      title: 'User ID', dataIndex: 'userId', key: 'userId',
      render: v => (
        <span style={{ fontWeight: 600, color: '#073354', fontFamily: 'monospace', fontSize: 13 }}>
          <UserOutlined style={{ marginRight: 6, opacity: 0.5 }} />{v}
        </span>
      ),
    },
    {
      title: 'Role', dataIndex: 'role', key: 'role', width: 100,
      render: v => v === 'SU'
        ? <Tag color="#073354" style={{ fontWeight: 'bold' }}>Super User</Tag>
        : <Tag color="green"  style={{ fontWeight: 'bold' }}>IU User</Tag>,
    },
    {
      title: 'Assigned Institute', dataIndex: 'instName', key: 'instName',
      render: (name, row) => name
        ? <span><Badge status="success" />{name} <span style={{ color: '#999', fontSize: 11 }}>({row.instId})</span></span>
        : <span style={{ color: '#bbb', fontStyle: 'italic' }}>— (Super User)</span>,
    },
    {
      title: 'Actions', key: 'actions', width: 140, align: 'center',
      render: (_, row) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(row)}>Edit</Button>
          <Popconfirm
            title={`Delete user "${row.userId}"?`}
            description="This cannot be undone."
            onConfirm={() => handleDelete(row.userId)}
            okText="Delete" okButtonProps={{ danger: true }}
            cancelText="Cancel"
          >
            <Button size="small" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const suCount = users.filter(u => u.role === 'SU').length;
  const iuCount = users.filter(u => u.role === 'IU').length;

  return (
    <div style={{ padding: '0 0 32px', fontFamily: 'Arial, Helvetica, sans-serif', background: '#f4f6f9', minHeight: '100%' }}>

      {/* Title bar */}
      <div style={{
        background: 'linear-gradient(135deg, #073354 0%, #0a4a78 100%)',
        color: '#fff', padding: '10px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderRadius: '0 0 6px 6px', boxShadow: '0 2px 6px rgba(0,0,0,0.18)', marginBottom: 14,
      }}>
        <div>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 2 }}>
            Administration
          </div>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>
            <TeamOutlined style={{ marginRight: 8 }} />User &amp; Role Management
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '3px 12px' }}>
            {users.length} Total Users
          </span>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}
            style={{ background: '#990000', borderColor: '#990000', fontWeight: 'bold' }}>
            Add User
          </Button>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        display: 'flex', gap: 12, margin: '0 16px 14px',
      }}>
        {[
          { label: 'Total Users', val: users.length, color: '#073354' },
          { label: 'Super Users (SU)', val: suCount, color: '#0a4a78' },
          { label: 'Institute Users (IU)', val: iuCount, color: '#2e7d32' },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            flex: 1, background: '#fff', borderRadius: 8, padding: '12px 16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderLeft: `4px solid ${color}`,
            display: 'flex', flexDirection: 'column',
          }}>
            <span style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
            <span style={{ fontSize: 24, fontWeight: 'bold', color }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ margin: '0 16px', background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', background: 'linear-gradient(90deg,#eef3f8,#dce8f4)', borderBottom: '2px solid #b8cfe8', fontWeight: 'bold', color: '#073354', fontSize: 13 }}>
          All Users
        </div>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="userId"
          loading={loading}
          size="small"
          pagination={{ pageSize: 20, showSizeChanger: false }}
          style={{ fontSize: 13 }}
        />
      </div>

      {/* Add / Edit Modal */}
      <Modal
        title={
          <span style={{ color: '#073354', fontWeight: 'bold' }}>
            {editUser ? `Edit User — ${editUser.userId}` : 'Add New User'}
          </span>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        confirmLoading={saving}
        okText={editUser ? 'Update' : 'Create User'}
        okButtonProps={{ style: { background: '#073354', borderColor: '#073354' } }}
        width={480}
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 12 }}>
          <Form.Item name="userId" label="User ID"
            rules={[{ required: true, message: 'User ID is required' }]}
          >
            <Input
              prefix={<UserOutlined />}
              disabled={!!editUser}
              placeholder="Enter user ID (e.g. admin, TCEC-Bengaluru)"
              style={{ fontFamily: 'monospace' }}
            />
          </Form.Item>

          <Form.Item name="role" label="Role" initialValue="IU"
            rules={[{ required: true, message: 'Role is required' }]}
          >
            <Select placeholder="Select role">
              <Option value="SU">
                <Tag color="#073354">Super User (SU)</Tag> — Full access, all institutes
              </Option>
              <Option value="IU">
                <Tag color="green">Institute User (IU)</Tag> — Access limited to one institute
              </Option>
            </Select>
          </Form.Item>

          {selectedRole === 'IU' && (
            <Form.Item name="instId" label="Assign Institute"
              rules={[{ required: true, message: 'Select an institute for IU role' }]}
            >
              <Select
                showSearch placeholder="Search and select institute"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children?.toString().toLowerCase().includes(input.toLowerCase())
                }
              >
                {institutes.map(inst => (
                  <Option key={inst.instId} value={inst.instId}>
                    {inst.instName} ({inst.instId})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="password"
            label={editUser ? 'New Password (leave blank to keep current)' : 'Password'}
            rules={editUser ? [] : [{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={editUser ? 'Leave blank to keep current password' : 'Enter password'}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
