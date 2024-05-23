package studio.farsighted.pfe.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.AxeSubCriteriaEntity;

import java.util.UUID;

public interface AxeSubCriteriaRepository extends JpaRepository<AxeSubCriteriaEntity, UUID> {
    @Query("SELECT axeSubCriteria FROM AxeSubCriteriaEntity axeSubCriteria WHERE " +
            "(:query IS NULL OR :query = '' OR LOWER(axeSubCriteria.axeSubCriteriaName) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:id IS NULL OR axeSubCriteria.axeSub.id = :id) ")
    Page<AxeSubCriteriaEntity> filterBasedOnCriteria(@Param("id") UUID id, @Param("query") String query, Pageable pageable);
}
