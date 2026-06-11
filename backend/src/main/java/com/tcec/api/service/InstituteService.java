package com.tcec.api.service;

import com.tcec.api.entity.TblDiInstitute;
import com.tcec.api.repository.DiInstituteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstituteService {

    private final DiInstituteRepository repo;

    public InstituteService(DiInstituteRepository repo) {
        this.repo = repo;
    }

    public List<TblDiInstitute> findAll() {
        return repo.findAll();
    }

    public Optional<TblDiInstitute> findByInstId(String instId) {
        return repo.findByInstId(instId);
    }
}
