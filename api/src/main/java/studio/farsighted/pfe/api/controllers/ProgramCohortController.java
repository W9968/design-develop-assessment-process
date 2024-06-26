package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.ProgramCohortEntity;
import studio.farsighted.pfe.api.services.ProgramCohortService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/program/cohort")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class ProgramCohortController {

    @Autowired
    private ProgramCohortService programCohortService;

    @GetMapping(value = "", params = {"programId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<ProgramCohortEntity>> index(@RequestParam(value = "programId", required = false) UUID programId, @PageableDefault(size = 10, page = 0, sort = "cohortStartDate", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            if (programId == null)
                return ResponseEntity.ok(programCohortService.get(pageable));

            return ResponseEntity.ok(programCohortService.findByProgram(programId, pageable));
        } catch (Exception e) {
            throw new PersistDataException("Program Cohorts not found: " + e.getMessage());
        }
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ProgramCohortEntity> show(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(programCohortService.find(id));
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort not found: " + e.getMessage());
        }
    }

    @PostMapping(value = "", params = {"programId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ProgramCohortEntity> save(@RequestParam(value = "programId") UUID id, @RequestBody ProgramCohortEntity programCohort) {
        try {
            return ResponseEntity.ok(programCohortService.save(id, programCohort));
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort not saved: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ProgramCohortEntity> update(@RequestBody ProgramCohortEntity programCohort) {
        try {
            return ResponseEntity.ok(programCohortService.update(programCohort));
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort not updated: " + e.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Boolean> delete(@PathVariable("id") UUID id) {
        try {
            programCohortService.delete(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            throw new PersistDataException("Program Cohort not deleted: " + e.getMessage());
        }
    }

    @GetMapping("/get-cohort-list")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<List<ProgramCohortEntity>> getAll() {
        try {
            return ResponseEntity.ok(programCohortService.getAll());
        } catch (Exception e) {
            throw new PersistDataException("Program Cohorts not found: " + e.getMessage());
        }
    }

}
