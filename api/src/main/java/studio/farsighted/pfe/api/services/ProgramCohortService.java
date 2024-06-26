package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.interfaces.ProgramCohortInterface;
import studio.farsighted.pfe.api.models.ProgramCohortEntity;
import studio.farsighted.pfe.api.models.ProgramEntity;
import studio.farsighted.pfe.api.repositories.ProgramCohortRepository;
import studio.farsighted.pfe.api.repositories.ProgramRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ProgramCohortService implements ProgramCohortInterface {

    @Autowired
    private ProgramCohortRepository programCohortRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Override
    public List<ProgramCohortEntity> getAll() {
        return programCohortRepository.findAll();
    }

    @Override
    public Page<ProgramCohortEntity> get(Pageable pageable) {
        return programCohortRepository.findAll(pageable);
    }

    @Override
    public Page<ProgramCohortEntity> findByProgram(UUID id, Pageable pageable) {
        return programCohortRepository.findAllByProgramId(id, pageable);
    }

    @Override
    public ProgramCohortEntity find(UUID id) {
        return programCohortRepository.findById(id).get();
    }

    @Override
    public ProgramCohortEntity save(UUID id, ProgramCohortEntity programCohortEntity) {
        ProgramEntity program = programRepository.findById(id).orElseThrow(() -> new PersistDataException("Program not found"));
        programCohortEntity.setProgram(program);
        return programCohortRepository.save(programCohortEntity);
    }

    @Override
    public ProgramCohortEntity update(ProgramCohortEntity programCohortEntity) {
        return programCohortRepository.save(programCohortEntity);
    }

    @Override
    public void delete(UUID id) {
        programCohortRepository.deleteById(id);
    }

    @Override
    public Boolean isExist(UUID id) {
        return programCohortRepository.existsById(id);
    }
}
