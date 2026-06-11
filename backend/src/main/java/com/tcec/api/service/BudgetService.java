package com.tcec.api.service;

import com.tcec.api.entity.TblBudget;
import com.tcec.api.repository.BudgetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BudgetService {

    private final BudgetRepository repo;

    public BudgetService(BudgetRepository repo) {
        this.repo = repo;
    }

    public Optional<TblBudget> find(String instId, String months, String years) {
        return repo.findByInstIdAndMonthsAndYears(instId, months, years);
    }

    @Transactional
    public TblBudget save(TblBudget data) {
        Optional<TblBudget> existing =
                repo.findByInstIdAndMonthsAndYears(data.getInstId(), data.getMonths(), data.getYears());
        TblBudget entity = existing.orElse(new TblBudget());
        copyAllFields(data, entity);
        return repo.save(entity);
    }

    private void copyAllFields(TblBudget src, TblBudget dst) {
        dst.setInstId(src.getInstId());
        dst.setMonths(src.getMonths());
        dst.setYears(src.getYears());
        dst.setMonthsYear(src.getMonthsYear());

        dst.setCryFwdAmt(src.getCryFwdAmt());
        dst.setCryFwdUtilDm(src.getCryFwdUtilDm());
        dst.setCryFwdUtilCum(src.getCryFwdUtilCum());
        dst.setCryFwdUtilBal(src.getCryFwdUtilBal());

        dst.setGiaAmt(src.getGiaAmt());
        dst.setGiaUtilDm(src.getGiaUtilDm());
        dst.setGiaUtilCum(src.getGiaUtilCum());
        dst.setGiaUtilBal(src.getGiaUtilBal());

        dst.setStfStSsA(src.getStfStSsA());
        dst.setStfStSsB(src.getStfStSsB());
        dst.setStfStSsC(src.getStfStSsC());
        dst.setStfStSsD(src.getStfStSsD());
        dst.setStfStPosA(src.getStfStPosA());
        dst.setStfStPosB(src.getStfStPosB());
        dst.setStfStPosC(src.getStfStPosC());
        dst.setStfStPosD(src.getStfStPosD());

        dst.setBudgetTotalAmt(src.getBudgetTotalAmt());
        dst.setBudgetTotalUtilDm(src.getBudgetTotalUtilDm());
        dst.setBudgetTotalUtilCum(src.getBudgetTotalUtilCum());
        dst.setBudgetTotalUtilBal(src.getBudgetTotalUtilBal());

        dst.setMachineDtm(src.getMachineDtm());
        dst.setMachineCum(src.getMachineCum());

        dst.setDetailsVisit(src.getDetailsVisit());
        dst.setSignificant(src.getSignificant());
        dst.setShortsFall(src.getShortsFall());
        dst.setSisiNm(src.getSisiNm());
        dst.setNewtext(src.getNewtext());
    }
}
