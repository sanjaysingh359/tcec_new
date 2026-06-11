package com.tcec.api.service;

import com.tcec.api.entity.TblFinancial;
import com.tcec.api.repository.FinancialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class FinancialService {

    private final FinancialRepository repo;

    public FinancialService(FinancialRepository repo) {
        this.repo = repo;
    }

    public Optional<TblFinancial> find(String instId, String months, String years) {
        return repo.findByInstIdAndMonthsAndYears(instId, months, years);
    }

    @Transactional
    public TblFinancial save(TblFinancial data, String clientIp) {
        Optional<TblFinancial> existing =
                repo.findByInstIdAndMonthsAndYears(data.getInstId(), data.getMonths(), data.getYears());

        TblFinancial entity = existing.orElse(new TblFinancial());

        // Copy all numeric + text fields (entity sno is preserved if existing)
        copyAllFields(data, entity);

        return repo.save(entity);
    }

    private void copyAllFields(TblFinancial src, TblFinancial dst) {
        dst.setInstId(src.getInstId());
        dst.setMonths(src.getMonths());
        dst.setYears(src.getYears());
        dst.setMonthsYear(src.getMonthsYear());
        dst.setSisiNm(src.getSisiNm());

        dst.setRevEarCashTrngTarget(src.getRevEarCashTrngTarget());
        dst.setRevEarCashTrngDtm(src.getRevEarCashTrngDtm());
        dst.setRevEarCashTrngCum(src.getRevEarCashTrngCum());
        dst.setRevEarCashPrdtnTarget(src.getRevEarCashPrdtnTarget());
        dst.setRevEarCashPrdtnDtm(src.getRevEarCashPrdtnDtm());
        dst.setRevEarCashPrdtnCum(src.getRevEarCashPrdtnCum());
        dst.setRevEarCashMiscTarget(src.getRevEarCashMiscTarget());
        dst.setRevEarCashMiscDtm(src.getRevEarCashMiscDtm());
        dst.setRevEarCashMiscCum(src.getRevEarCashMiscCum());
        dst.setRevEarCashTotalTarget(src.getRevEarCashTotalTarget());
        dst.setRevEarCashTotalDtm(src.getRevEarCashTotalDtm());
        dst.setRevEarCashTotalCum(src.getRevEarCashTotalCum());

        dst.setRevEarAccrualTrngTarget(src.getRevEarAccrualTrngTarget());
        dst.setRevEarAccrualTrngDtm(src.getRevEarAccrualTrngDtm());
        dst.setRevEarAccrualTrngCum(src.getRevEarAccrualTrngCum());
        dst.setRevEarAccrualPrdtnTarget(src.getRevEarAccrualPrdtnTarget());
        dst.setRevEarAccrualPrdtnDtm(src.getRevEarAccrualPrdtnDtm());
        dst.setRevEarAccrualPrdtnCum(src.getRevEarAccrualPrdtnCum());
        dst.setRevEarAccrualMiscTarget(src.getRevEarAccrualMiscTarget());
        dst.setRevEarAccrualMiscDtm(src.getRevEarAccrualMiscDtm());
        dst.setRevEarAccrualMiscCum(src.getRevEarAccrualMiscCum());
        dst.setRevEarAccrualTotalTarget(src.getRevEarAccrualTotalTarget());
        dst.setRevEarAccrualTotalDtm(src.getRevEarAccrualTotalDtm());
        dst.setRevEarAccrualTotalCum(src.getRevEarAccrualTotalCum());

        dst.setRevExpCashTarget(src.getRevExpCashTarget());
        dst.setRevExpCashDtm(src.getRevExpCashDtm());
        dst.setRevExpCashCum(src.getRevExpCashCum());
        dst.setRevExpAccrualTarget(src.getRevExpAccrualTarget());
        dst.setRevExpAccrualDtm(src.getRevExpAccrualDtm());
        dst.setRevExpAccrualCum(src.getRevExpAccrualCum());

        dst.setIncExpCashTarget(src.getIncExpCashTarget());
        dst.setIncExpCashDtm(src.getIncExpCashDtm());
        dst.setIncExpCashCum(src.getIncExpCashCum());
        dst.setIncExpAccrualTarget(src.getIncExpAccrualTarget());
        dst.setIncExpAccrualDtm(src.getIncExpAccrualDtm());
        dst.setIncExpAccrualCum(src.getIncExpAccrualCum());

        dst.setPerRecCashTarget(src.getPerRecCashTarget());
        dst.setPerRecCashDtm(src.getPerRecCashDtm());
        dst.setPerRecCashCum(src.getPerRecCashCum());
        dst.setPerRecAccrualTarget(src.getPerRecAccrualTarget());
        dst.setPerRecAccrualDtm(src.getPerRecAccrualDtm());
        dst.setPerRecAccrualCum(src.getPerRecAccrualCum());

        dst.setTestCalServicesTarget(src.getTestCalServicesTarget());
        dst.setTestCalServicesDtm(src.getTestCalServicesDtm());
        dst.setTestCalServicesMon(src.getTestCalServicesMon());
        dst.setTestCalServicesAccTarget(src.getTestCalServicesAccTarget());
        dst.setTestCalServicesAccDtm(src.getTestCalServicesAccDtm());
        dst.setTestCalServicesAccMon(src.getTestCalServicesAccMon());

        dst.setRevEarCshBasConsultTarget(src.getRevEarCshBasConsultTarget());
        dst.setRevEarCshBasConsultDtm(src.getRevEarCshBasConsultDtm());
        dst.setRevEarCshBasConsultCum(src.getRevEarCshBasConsultCum());
        dst.setRevEarAcclBasConsultTarget(src.getRevEarAcclBasConsultTarget());
        dst.setRevEarAcclBasConsultDtm(src.getRevEarAcclBasConsultDtm());
        dst.setRevEarAcclBasConsultCum(src.getRevEarAcclBasConsultCum());

        dst.setRevEarCashPrdtnToolingTarget(src.getRevEarCashPrdtnToolingTarget());
        dst.setRevEarCashPrdtnToolingDtm(src.getRevEarCashPrdtnToolingDtm());
        dst.setRevEarCashPrdtnToolingCum(src.getRevEarCashPrdtnToolingCum());
        dst.setRevEarCashPrdtnOtherjobTarget(src.getRevEarCashPrdtnOtherjobTarget());
        dst.setRevEarCashPrdtnOtherjobDtm(src.getRevEarCashPrdtnOtherjobDtm());
        dst.setRevEarCashPrdtnOtherjobCum(src.getRevEarCashPrdtnOtherjobCum());
        dst.setRevEarAccrualPrdtnToolingTarget(src.getRevEarAccrualPrdtnToolingTarget());
        dst.setRevEarAccrualPrdtnToolingDtm(src.getRevEarAccrualPrdtnToolingDtm());
        dst.setRevEarAccrualPrdtnToolingCum(src.getRevEarAccrualPrdtnToolingCum());
        dst.setRevEarAccrualPrdtnOtherjobTarget(src.getRevEarAccrualPrdtnOtherjobTarget());
        dst.setRevEarAccrualPrdtnOtherjobDtm(src.getRevEarAccrualPrdtnOtherjobDtm());
        dst.setRevEarAccrualPrdtnOtherjobCum(src.getRevEarAccrualPrdtnOtherjobCum());
    }
}
