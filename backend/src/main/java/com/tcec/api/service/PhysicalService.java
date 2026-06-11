package com.tcec.api.service;

import com.tcec.api.entity.TblPhysical;
import com.tcec.api.repository.PhysicalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PhysicalService {

    private final PhysicalRepository repo;

    public PhysicalService(PhysicalRepository repo) {
        this.repo = repo;
    }

    public Optional<TblPhysical> find(String instId, String months, String years) {
        return repo.findByInstIdAndMonthsAndYears(instId, months, years);
    }

    @Transactional
    public TblPhysical save(TblPhysical data) {
        Optional<TblPhysical> existing =
                repo.findByInstIdAndMonthsAndYears(data.getInstId(), data.getMonths(), data.getYears());
        // For composite PK entity, JPA merge handles insert vs update
        TblPhysical entity = existing.orElse(new TblPhysical());
        copyAllFields(data, entity);
        return repo.save(entity);
    }

    private void copyAllFields(TblPhysical src, TblPhysical dst) {
        dst.setInstId(src.getInstId());
        dst.setMonths(src.getMonths());
        dst.setYears(src.getYears());
        dst.setMonthsYear(src.getMonthsYear());
        dst.setSisiNm(src.getSisiNm());

        dst.setNjuMsmeNoTarget(src.getNjuMsmeNoTarget());
        dst.setNjuMsmeNoDtm(src.getNjuMsmeNoDtm());
        dst.setNjuMsmeNoCum(src.getNjuMsmeNoCum());
        dst.setNjuMsmeValueTarget(src.getNjuMsmeValueTarget());
        dst.setNjuMsmeValueDtm(src.getNjuMsmeValueDtm());
        dst.setNjuMsmeValueCum(src.getNjuMsmeValueCum());

        dst.setNjuOtherNoTarget(src.getNjuOtherNoTarget());
        dst.setNjuOtherNoDtm(src.getNjuOtherNoDtm());
        dst.setNjuOtherNoCum(src.getNjuOtherNoCum());
        dst.setNjuOtherValueTarget(src.getNjuOtherValueTarget());
        dst.setNjuOtherValueDtm(src.getNjuOtherValueDtm());
        dst.setNjuOtherValueCum(src.getNjuOtherValueCum());

        dst.setConsltMsmeTarget(src.getConsltMsmeTarget());
        dst.setConsltMsmeDtm(src.getConsltMsmeDtm());
        dst.setConsltMsmeCum(src.getConsltMsmeCum());
        dst.setConsltOtherTarget(src.getConsltOtherTarget());
        dst.setConsltOtherDtm(src.getConsltOtherDtm());
        dst.setConsltOtherCum(src.getConsltOtherCum());

        dst.setAnyOtherTarget(src.getAnyOtherTarget());
        dst.setAnyOtherDtm(src.getAnyOtherDtm());
        dst.setAnyOtherCum(src.getAnyOtherCum());

        dst.setTaLtcTarget(src.getTaLtcTarget());
        dst.setTaLtcDtm(src.getTaLtcDtm());
        dst.setTaLtcCum(src.getTaLtcCum());
        dst.setTaStcNccTarget(src.getTaStcNccTarget());
        dst.setTaStcNccDtm(src.getTaStcNccDtm());
        dst.setTaStcNccCum(src.getTaStcNccCum());
        dst.setTaStcNttTarget(src.getTaStcNttTarget());
        dst.setTaStcNttDtm(src.getTaStcNttDtm());
        dst.setTaStcNttCum(src.getTaStcNttCum());
        dst.setTaOthersTarget(src.getTaOthersTarget());
        dst.setTaOthersDtm(src.getTaOthersDtm());
        dst.setTaOthersCum(src.getTaOthersCum());

        dst.setSeminarNoTarget(src.getSeminarNoTarget());
        dst.setSeminarNoDtm(src.getSeminarNoDtm());
        dst.setSeminarNoCum(src.getSeminarNoCum());
        dst.setSeminarParticipantsTarget(src.getSeminarParticipantsTarget());
        dst.setSeminarParticipantsDtm(src.getSeminarParticipantsDtm());
        dst.setSeminarParticipantsCum(src.getSeminarParticipantsCum());

        dst.setTtbDtmSc(src.getTtbDtmSc());
        dst.setTtbDtmSt(src.getTtbDtmSt());
        dst.setTtbDtmWomen(src.getTtbDtmWomen());
        dst.setTtbDtmObc(src.getTtbDtmObc());
        dst.setTtbDtmPh(src.getTtbDtmPh());
        dst.setTtbDtmMin(src.getTtbDtmMin());
        dst.setTtbDtmTotal(src.getTtbDtmTotal());
        dst.setTtbCumSc(src.getTtbCumSc());
        dst.setTtbCumSt(src.getTtbCumSt());
        dst.setTtbCumWomen(src.getTtbCumWomen());
        dst.setTtbCumObc(src.getTtbCumObc());
        dst.setTtbCumPh(src.getTtbCumPh());
        dst.setTtbCumMin(src.getTtbCumMin());
        dst.setTtbCumTotal(src.getTtbCumTotal());

        dst.setTrngTotalNocCumuMon(src.getTrngTotalNocCumuMon());
        dst.setTrngTotalNocDtm(src.getTrngTotalNocDtm());
        dst.setTringTotalNotDtm(src.getTringTotalNotDtm());
        dst.setTringTotalNotCum(src.getTringTotalNotCum());
        dst.setGeneralTtb(src.getGeneralTtb());
        dst.setGeneralCum(src.getGeneralCum());

        dst.setGen(src.getGen());
        dst.setMen(src.getMen());
        dst.setTransgender(src.getTransgender());
        dst.setGenCum(src.getGenCum());
        dst.setMenCum(src.getMenCum());
        dst.setTransgenderCum(src.getTransgenderCum());

        dst.setTenfail(src.getTenfail());
        dst.setTenpass(src.getTenpass());
        dst.setTwelth(src.getTwelth());
        dst.setGraduation(src.getGraduation());
        dst.setPg(src.getPg());
        dst.setTenfailCum(src.getTenfailCum());
        dst.setTenpassCum(src.getTenpassCum());
        dst.setTwelthCum(src.getTwelthCum());
        dst.setGraduationCum(src.getGraduationCum());
        dst.setPgCum(src.getPgCum());

        dst.setLimit1(src.getLimit1());
        dst.setLimit2(src.getLimit2());
        dst.setLimit3(src.getLimit3());
        dst.setLimit4(src.getLimit4());
        dst.setLimit1Cum(src.getLimit1Cum());
        dst.setLimit2Cum(src.getLimit2Cum());
        dst.setLimit3Cum(src.getLimit3Cum());
        dst.setLimit4Cum(src.getLimit4Cum());

        dst.setAbove(src.getAbove());
        dst.setAbovec(src.getAbovec());
        dst.setDiploma(src.getDiploma());
        dst.setDiplomac(src.getDiplomac()); // field: diplomac
        dst.setIti(src.getIti());
        dst.setItic(src.getItic());
        dst.setGraduationNontech(src.getGraduationNontech());
        dst.setGraduationTech(src.getGraduationTech());
        dst.setPostgraduateNontech(src.getPostgraduateNontech());
        dst.setPostgraduateTech(src.getPostgraduateTech());
        dst.setPhdmhil(src.getPhdmhil());
        dst.setGraduationNontechc(src.getGraduationNontechc());
        dst.setGraduationTechc(src.getGraduationTechc());
        dst.setPostgraduateNontechc(src.getPostgraduateNontechc());
        dst.setPostgraduateTechc(src.getPostgraduateTechc());
        dst.setPhdmhilc(src.getPhdmhilc());

        dst.setMsmeNosToolingTarget(src.getMsmeNosToolingTarget());
        dst.setMsmeNosToolingDtm(src.getMsmeNosToolingDtm());
        dst.setMsmeNosToolingCumuMon(src.getMsmeNosToolingCumuMon());
        dst.setMsmeValuesToolingTarget(src.getMsmeValuesToolingTarget());
        dst.setMsmeValuesToolingDtm(src.getMsmeValuesToolingDtm());
        dst.setMsmeValuesToolingCumuMon(src.getMsmeValuesToolingCumuMon());

        dst.setOtherNosToolingTarget(src.getOtherNosToolingTarget());
        dst.setOtherNosToolingDtm(src.getOtherNosToolingDtm());
        dst.setOtherNosToolingCumuMon(src.getOtherNosToolingCumuMon());
        dst.setOtherValuesToolingTarget(src.getOtherValuesToolingTarget());
        dst.setOtherValuesToolingDtm(src.getOtherValuesToolingDtm());
        dst.setOtherValuesToolingCumuMon(src.getOtherValuesToolingCumuMon());

        dst.setMsmeNosOtherjobTarget(src.getMsmeNosOtherjobTarget());
        dst.setMsmeNosOtherjobDtm(src.getMsmeNosOtherjobDtm());
        dst.setMsmeNosOtherjobCumuMon(src.getMsmeNosOtherjobCumuMon());
        dst.setMsmeValuesOtherjobTarget(src.getMsmeValuesOtherjobTarget());
        dst.setMsmeValuesOtherjobDtm(src.getMsmeValuesOtherjobDtm());
        dst.setMsmeValuesOtherjobCumuMon(src.getMsmeValuesOtherjobCumuMon());

        dst.setOtherNosOtherjobTarget(src.getOtherNosOtherjobTarget());
        dst.setOtherNosOtherjobDtm(src.getOtherNosOtherjobDtm());
        dst.setOtherNosOtherjobCumuMon(src.getOtherNosOtherjobCumuMon());
        dst.setOtherValuesOtherjobTarget(src.getOtherValuesOtherjobTarget());
        dst.setOtherValuesOtherjobDtm(src.getOtherValuesOtherjobDtm());
        dst.setOtherValuesOtherjobCumuMon(src.getOtherValuesOtherjobCumuMon());
    }
}
