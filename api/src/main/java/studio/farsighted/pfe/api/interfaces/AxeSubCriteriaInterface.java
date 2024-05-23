package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.AxeSubCriteriaEntity;

import java.util.UUID;

public interface AxeSubCriteriaInterface {

    Page<AxeSubCriteriaEntity> get(UUID id, String query, Pageable pageable);

    AxeSubCriteriaEntity find(UUID id);

    AxeSubCriteriaEntity save(UUID id, AxeSubCriteriaEntity axeSubCriteriaEntity);

    AxeSubCriteriaEntity update(AxeSubCriteriaEntity axeSubCriteriaEntity);

    void delete(UUID id);

    Boolean existsById(UUID id);

}
