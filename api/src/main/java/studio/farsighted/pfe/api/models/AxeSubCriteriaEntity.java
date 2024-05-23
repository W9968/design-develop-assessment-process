package studio.farsighted.pfe.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "datatable-axe-sub-criteria")
public class AxeSubCriteriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "axe-sub-criteria-name", unique = true)
    private String axeSubCriteriaName;

    @Column(name = "axe-sub-criteria-description", columnDefinition = "TEXT")
    private String axeSubCriteriaDescription;

    @Column(name = "axe-sub-criteria-status", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean status = true;

    @Column(name = "axe-sub-criteria-weight")
    private Integer axeSubCriteriaWeight;

    @ManyToOne()
    @JoinColumn(referencedColumnName = "id")
    private AxeSubEntity axeSub;

}
