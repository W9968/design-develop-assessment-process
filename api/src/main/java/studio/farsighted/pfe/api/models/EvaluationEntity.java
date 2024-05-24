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
@Table(name = "datatable-evaluations")
public class EvaluationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "evaluation-score")
    private Integer evaluationScore = 0;

    @Column(name = "evaluation-feedback", columnDefinition = "TEXT")
    private String evaluationFeedback;

    @ManyToOne()
    @JoinColumn(referencedColumnName = "id")
    private ProgramCohortEntity cohort;

    @ManyToOne()
    @JoinColumn(referencedColumnName = "id")
    private StartupEntity startup;

}
