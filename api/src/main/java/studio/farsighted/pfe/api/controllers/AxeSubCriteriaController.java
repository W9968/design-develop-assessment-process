package studio.farsighted.pfe.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import studio.farsighted.pfe.api.exceptions.PaginationBoundException;
import studio.farsighted.pfe.api.exceptions.PersistDataException;
import studio.farsighted.pfe.api.models.AxeSubCriteriaEntity;
import studio.farsighted.pfe.api.services.AxeSubCriteriaService;

import java.util.UUID;

@RestController
@RequestMapping("/api/axe/sub/criteria")
@CrossOrigin(origins = "http://localhost:1999 ", allowCredentials = "true", allowedHeaders = "*")
public class AxeSubCriteriaController {

    @Autowired
    private AxeSubCriteriaService axeSubCriteriaService;

    @GetMapping(value = "", params = {"subId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Page<AxeSubCriteriaEntity>> index(@RequestParam(value = "subId") UUID subId, @RequestParam(value = "query", required = false) String query, @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        try {
            return ResponseEntity.ok(axeSubCriteriaService.get(subId, query, pageable));
        } catch (Exception e) {
            throw new PaginationBoundException("Axe sub criteria not found: " + e.getMessage());
        }
    }

    @PostMapping(value = "", params = {"subId"})
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeSubCriteriaEntity> save(@RequestParam(value = "subId") UUID subId, @RequestBody AxeSubCriteriaEntity axeSubCriteriaEntity) {
        try {
            return ResponseEntity.ok(axeSubCriteriaService.save(subId, axeSubCriteriaEntity));
        } catch (Exception e) {
            throw new PersistDataException("Axe sub criteria not saved: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeSubCriteriaEntity> update(@PathVariable("id") UUID id, @RequestBody AxeSubCriteriaEntity axeSubCriteriaEntity) {
        if (!axeSubCriteriaService.existsById(id)) {
            throw new PersistDataException("Axe sub criteria with id: " + id + " not found");
        }
        return ResponseEntity.ok(axeSubCriteriaService.update(axeSubCriteriaEntity));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<AxeSubCriteriaEntity> find(@PathVariable("id") UUID id) {
        if (!axeSubCriteriaService.existsById(id)) {
            throw new PersistDataException("Axe sub criteria with id: " + id + " not found");
        }
        return ResponseEntity.ok(axeSubCriteriaService.find(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Boolean> delete(@PathVariable("id") UUID id) {
        if (!axeSubCriteriaService.existsById(id)) {
            throw new PersistDataException("Axe sub criteria with id: " + id + " not found");
        }
        try {
            axeSubCriteriaService.delete(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            throw new PersistDataException("Axe sub criteria not deleted: " + e.getMessage());
        }
    }

}
