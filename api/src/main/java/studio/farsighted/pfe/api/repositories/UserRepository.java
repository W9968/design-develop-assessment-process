package studio.farsighted.pfe.api.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studio.farsighted.pfe.api.models.UserEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByUsername(String username);

    @Query("SELECT DISTINCT department FROM UserEntity")
    List<String> findDistinctUserDepartment();

    @Query("SELECT user FROM UserEntity user WHERE (:query IS NULL OR :query = '')")
    Page<UserEntity> findUserByFilterCriteria(@Param("query") String query, @Param("role") String role, @Param("department") String dep, Pageable pageable);

}