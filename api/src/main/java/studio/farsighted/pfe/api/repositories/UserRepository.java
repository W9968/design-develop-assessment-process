package studio.farsighted.pfe.api.repositories;


import org.hibernate.query.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import studio.farsighted.pfe.api.models.UserEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByUsername(String username);

    @Query("SELECT DISTINCT department FROM UserEntity")
    List<String> findDistinctUserDepartment();

//    @Query()
//    Page<UserEntity> findUserByFilterCriteria(Pageable pageable);

}