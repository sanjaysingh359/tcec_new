package com.tcec.api.service;

import com.tcec.api.entity.TblPlacement;
import com.tcec.api.repository.PlacementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class PlacementService {

    private final PlacementRepository repo;
    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    public PlacementService(PlacementRepository repo) {
        this.repo = repo;
    }

    public Optional<TblPlacement> find(String instId, String months, String years) {
        return repo.findByInstIdAndMonthsAndYears(instId, months, years);
    }

    @Transactional
    public TblPlacement save(TblPlacement data, String clientIp) {
        Optional<TblPlacement> existing =
                repo.findByInstIdAndMonthsAndYears(data.getInstId(), data.getMonths(), data.getYears());

        TblPlacement entity = existing.orElse(new TblPlacement());

        // Copy all fields from incoming DTO into entity
        copyFields(data, entity);

        // Audit fields
        entity.setTime(LocalDateTime.now().format(FMT));
        entity.setIp(clientIp);

        return repo.save(entity);
    }

    private void copyFields(TblPlacement src, TblPlacement dst) {
        dst.setInstId(src.getInstId());
        dst.setMonths(src.getMonths());
        dst.setYears(src.getYears());
        dst.setYearMonths(src.getYearMonths());

        dst.setNsqfComDm(src.getNsqfComDm());
        dst.setNsqfComCum(src.getNsqfComCum());
        dst.setNsqfExDm(src.getNsqfExDm());
        dst.setNsqfExCum(src.getNsqfExCum());
        dst.setNonNsqfDm(src.getNonNsqfDm());
        dst.setNonNsqfCum(src.getNonNsqfCum());

        dst.setPsTrnCertDm(src.getPsTrnCertDm());
        dst.setPsTrnCertCum(src.getPsTrnCertCum());
        dst.setPsTrnOptPlcDm(src.getPsTrnOptPlcDm());
        dst.setPsTrnOptPlcCum(src.getPsTrnOptPlcCum());
        dst.setPsTrnRegSmprkDm(src.getPsTrnRegSmprkDm());
        dst.setPsTrnRegSmprkCum(src.getPsTrnRegSmprkCum());
        dst.setPsCndPlcdDm(src.getPsCndPlcdDm());
        dst.setPsCndPlcdCum(src.getPsCndPlcdCum());
        dst.setPsEmpTrnDm(src.getPsEmpTrnDm());
        dst.setPsEmpTrnCum(src.getPsEmpTrnCum());
        dst.setPsTrnOptHstdDm(src.getPsTrnOptHstdDm());
        dst.setPsTrnOptHstdCum(src.getPsTrnOptHstdCum());
        dst.setPsCndOptSlfsDm(src.getPsCndOptSlfsDm());
        dst.setPsCndOptSlfsCum(src.getPsCndOptSlfsCum());
        dst.setPsCndToBeplcdDm(src.getPsCndToBeplcdDm());
        dst.setPsCndToBeplcdCum(src.getPsCndToBeplcdCum());

        dst.setNsqfExRam11Dm(src.getNsqfExRam11Dm());
        dst.setNsqfExRam11Cum(src.getNsqfExRam11Cum());
        dst.setNsqfExRam12Dm(src.getNsqfExRam12Dm());
        dst.setNsqfExRam12Cum(src.getNsqfExRam12Cum());
        dst.setNsqfExRam13Dm(src.getNsqfExRam13Dm());
        dst.setNsqfExRam13Cum(src.getNsqfExRam13Cum());
        dst.setNsqfExRam14Dm(src.getNsqfExRam14Dm());
        dst.setNsqfExRam14Cum(src.getNsqfExRam14Cum());
        dst.setNsqfExRam15Dm(src.getNsqfExRam15Dm());
        dst.setNsqfExRam15Cum(src.getNsqfExRam15Cum());
        dst.setNsqfExRam16Dm(src.getNsqfExRam16Dm());
        dst.setNsqfExRam16Cum(src.getNsqfExRam16Cum());
        dst.setNsqfExRam17Dm(src.getNsqfExRam17Dm());
        dst.setNsqfExRam17Cum(src.getNsqfExRam17Cum());
        dst.setNsqfExRam18Dm(src.getNsqfExRam18Dm());
        dst.setNsqfExRam18Cum(src.getNsqfExRam18Cum());

        dst.setNonNsqfRam31Dm(src.getNonNsqfRam31Dm());
        dst.setNonNsqfRam31Cum(src.getNonNsqfRam31Cum());
        dst.setNonNsqfRam32Dm(src.getNonNsqfRam32Dm());
        dst.setNonNsqfRam32Cum(src.getNonNsqfRam32Cum());
        dst.setNonNsqfRam33Dm(src.getNonNsqfRam33Dm());
        dst.setNonNsqfRam33Cum(src.getNonNsqfRam33Cum());
        dst.setNonNsqfRam34Dm(src.getNonNsqfRam34Dm());
        dst.setNonNsqfRam34Cum(src.getNonNsqfRam34Cum());
        dst.setNonNsqfRam35Dm(src.getNonNsqfRam35Dm());
        dst.setNonNsqfRam35Cum(src.getNonNsqfRam35Cum());
        dst.setNonNsqfRam36Dm(src.getNonNsqfRam36Dm());
        dst.setNonNsqfRam36Cum(src.getNonNsqfRam36Cum());
        dst.setNonNsqfRam37Dm(src.getNonNsqfRam37Dm());
        dst.setNonNsqfRam37Cum(src.getNonNsqfRam37Cum());
        dst.setNonNsqfRam38Dm(src.getNonNsqfRam38Dm());
        dst.setNonNsqfRam38Cum(src.getNonNsqfRam38Cum());
    }
}
