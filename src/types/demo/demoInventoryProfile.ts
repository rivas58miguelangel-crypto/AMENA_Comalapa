// Base futura del Motor Demo H-OperIA. Este perfil podrá alimentarse con
// inventario capturado exclusivamente desde la web pública del prospecto.

export type DemoDevelopmentType = "vertical" | "horizontal" | "mixed";

export type DemoInventoryUnitType = "apartment" | "lot";

export type DemoAvailabilityStatus =
  | "available"
  | "reserved"
  | "optioned"
  | "sold"
  | "not_released"
  | "temporarily_unavailable";

export type DemoAmenityCategory =
  | "social"
  | "recreation"
  | "sports"
  | "wellness"
  | "family"
  | "services"
  | "security"
  | "mobility"
  | "nature"
  | "other";

export type DemoProjectPhaseStatus =
  | "planned"
  | "pre_sale"
  | "under_construction"
  | "ready"
  | "completed";

export type DemoPriceKind =
  | "base"
  | "starting_at"
  | "list"
  | "reservation"
  | "monthly_estimate"
  | "other";

export interface DemoAvailability {
  status: DemoAvailabilityStatus;
  label?: string;
  availableFrom?: string;
  lastPublicCheckAt?: string;
  notes?: string;
}

export interface DemoPrice {
  id: string;
  kind: DemoPriceKind;
  currency?: string;
  amount?: number;
  amountFrom?: number;
  amountTo?: number;
  includesTaxes?: boolean;
  label?: string;
  notes?: string;
  isPublicReference: boolean;
}

export interface DemoAmenity {
  id: string;
  name: string;
  category: DemoAmenityCategory;
  description?: string;
  phaseIds?: string[];
  isHighlighted?: boolean;
}

export interface DemoInventoryModel {
  id: string;
  projectId: string;
  name: string;
  unitType: DemoInventoryUnitType;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  constructionAreaM2?: number;
  privateAreaM2?: number;
  lotAreaM2?: number;
  prices: DemoPrice[];
  amenityIds?: string[];
}

export interface DemoApartment {
  id: string;
  projectId: string;
  phaseId?: string;
  towerId: string;
  levelId: string;
  modelId: string;
  code: string;
  availability: DemoAvailability;
  prices: DemoPrice[];
  areaM2?: number;
  notes?: string;
}

export interface DemoInventoryLevel {
  id: string;
  towerId: string;
  name: string;
  number?: number;
  apartments: DemoApartment[];
}

export interface DemoTower {
  id: string;
  projectId: string;
  phaseId?: string;
  name: string;
  description?: string;
  levels: DemoInventoryLevel[];
  amenityIds?: string[];
}

export interface DemoLot {
  id: string;
  projectId: string;
  phaseId?: string;
  blockId: string;
  modelId?: string;
  code: string;
  availability: DemoAvailability;
  prices: DemoPrice[];
  lotAreaM2?: number;
  frontageM?: number;
  depthM?: number;
  notes?: string;
}

export interface DemoBlock {
  id: string;
  projectId: string;
  phaseId?: string;
  name: string;
  description?: string;
  lots: DemoLot[];
  amenityIds?: string[];
}

export interface DemoProjectPhase {
  id: string;
  projectId: string;
  name: string;
  sequence: number;
  status: DemoProjectPhaseStatus;
  description?: string;
  towerIds: string[];
  blockIds: string[];
  amenityIds?: string[];
}

export interface DemoRealEstateProject {
  id: string;
  name: string;
  developmentType: DemoDevelopmentType;
  locationLabel?: string;
  description?: string;
  phases: DemoProjectPhase[];
  towers: DemoTower[];
  blocks: DemoBlock[];
  models: DemoInventoryModel[];
  amenities: DemoAmenity[];
  prices: DemoPrice[];
}

export interface DemoInventorySource {
  kind: "public_website" | "safe_example";
  publicUrl?: string;
  capturedAt?: string;
  notes?: string;
}

export interface DemoInventoryProfile {
  id: string;
  name: string;
  version: number;
  isExample: boolean;
  source: DemoInventorySource;
  projects: DemoRealEstateProject[];
}

export type DemoInventoryValidationSeverity = "error" | "warning";

export interface DemoInventoryValidationIssue {
  code: string;
  severity: DemoInventoryValidationSeverity;
  path: string;
  message: string;
}

export interface DemoInventoryValidationResult {
  isValid: boolean;
  issues: DemoInventoryValidationIssue[];
  errors: DemoInventoryValidationIssue[];
  warnings: DemoInventoryValidationIssue[];
}

const hasText = (value: string): boolean => value.trim().length > 0;

const findDuplicateIds = (ids: string[]): string[] =>
  ids.filter((id, index) => ids.indexOf(id) !== index);

const validatePrices = (
  prices: DemoPrice[],
  path: string,
  addIssue: (
    code: string,
    severity: DemoInventoryValidationSeverity,
    path: string,
    message: string,
  ) => void,
): void => {
  prices.forEach((price, index) => {
    const pricePath = `${path}[${index}]`;
    const numericValues = [price.amount, price.amountFrom, price.amountTo];

    if (numericValues.some((value) => value !== undefined && value < 0)) {
      addIssue(
        "negative_demo_price",
        "error",
        pricePath,
        "Los precios demo no pueden contener valores negativos.",
      );
    }

    if (
      price.amountFrom !== undefined &&
      price.amountTo !== undefined &&
      price.amountFrom > price.amountTo
    ) {
      addIssue(
        "invalid_demo_price_range",
        "error",
        pricePath,
        "El valor inicial del rango demo no puede superar el valor final.",
      );
    }
  });
};

export function validateDemoInventoryProfile(
  profile: DemoInventoryProfile,
): DemoInventoryValidationResult {
  const issues: DemoInventoryValidationIssue[] = [];

  const addIssue = (
    code: string,
    severity: DemoInventoryValidationSeverity,
    path: string,
    message: string,
  ): void => {
    issues.push({ code, severity, path, message });
  };

  if (!hasText(profile.id)) {
    addIssue("profile_id_required", "error", "id", "El perfil requiere un ID.");
  }

  if (!hasText(profile.name)) {
    addIssue(
      "profile_name_required",
      "error",
      "name",
      "El perfil requiere un nombre.",
    );
  }

  if (profile.projects.length === 0) {
    addIssue(
      "projects_required",
      "error",
      "projects",
      "El perfil debe incluir al menos un proyecto demo.",
    );
  }

  findDuplicateIds(profile.projects.map((project) => project.id)).forEach(
    (id) => {
      addIssue(
        "duplicate_project_id",
        "error",
        "projects",
        `El ID de proyecto "${id}" está duplicado.`,
      );
    },
  );

  profile.projects.forEach((project, projectIndex) => {
    const projectPath = `projects[${projectIndex}]`;
    const phaseIds = new Set(project.phases.map((phase) => phase.id));
    const towerIds = new Set(project.towers.map((tower) => tower.id));
    const blockIds = new Set(project.blocks.map((block) => block.id));
    const modelIds = new Set(project.models.map((model) => model.id));
    const amenityIds = new Set(project.amenities.map((amenity) => amenity.id));

    if (!hasText(project.id) || !hasText(project.name)) {
      addIssue(
        "project_identity_required",
        "error",
        projectPath,
        "Cada proyecto requiere ID y nombre.",
      );
    }

    if (project.developmentType === "vertical" && project.towers.length === 0) {
      addIssue(
        "vertical_towers_required",
        "error",
        `${projectPath}.towers`,
        "Un desarrollo vertical debe incluir al menos una torre.",
      );
    }

    if (
      project.developmentType === "horizontal" &&
      project.blocks.length === 0
    ) {
      addIssue(
        "horizontal_blocks_required",
        "error",
        `${projectPath}.blocks`,
        "Un desarrollo horizontal debe incluir al menos una manzana.",
      );
    }

    if (
      project.developmentType === "mixed" &&
      (project.towers.length === 0 || project.blocks.length === 0)
    ) {
      addIssue(
        "mixed_inventory_required",
        "error",
        projectPath,
        "Un desarrollo mixto debe incluir torres y manzanas.",
      );
    }

    const projectIds = [
      ...project.phases.map((item) => item.id),
      ...project.towers.map((item) => item.id),
      ...project.blocks.map((item) => item.id),
      ...project.models.map((item) => item.id),
      ...project.amenities.map((item) => item.id),
      ...project.prices.map((item) => item.id),
    ];

    findDuplicateIds(projectIds).forEach((id) => {
      addIssue(
        "duplicate_inventory_id",
        "error",
        projectPath,
        `El ID de inventario "${id}" está duplicado dentro del proyecto.`,
      );
    });

    project.phases.forEach((phase, phaseIndex) => {
      const phasePath = `${projectPath}.phases[${phaseIndex}]`;

      if (phase.projectId !== project.id) {
        addIssue(
          "invalid_phase_project_reference",
          "error",
          `${phasePath}.projectId`,
          "La fase debe pertenecer al proyecto que la contiene.",
        );
      }

      phase.towerIds.forEach((towerId) => {
        if (!towerIds.has(towerId)) {
          addIssue(
            "unknown_phase_tower",
            "error",
            `${phasePath}.towerIds`,
            `La torre "${towerId}" no existe en el proyecto.`,
          );
        }
      });

      phase.blockIds.forEach((blockId) => {
        if (!blockIds.has(blockId)) {
          addIssue(
            "unknown_phase_block",
            "error",
            `${phasePath}.blockIds`,
            `La manzana "${blockId}" no existe en el proyecto.`,
          );
        }
      });
    });

    project.towers.forEach((tower, towerIndex) => {
      const towerPath = `${projectPath}.towers[${towerIndex}]`;

      if (tower.projectId !== project.id) {
        addIssue(
          "invalid_tower_project_reference",
          "error",
          `${towerPath}.projectId`,
          "La torre debe pertenecer al proyecto que la contiene.",
        );
      }

      if (tower.phaseId && !phaseIds.has(tower.phaseId)) {
        addIssue(
          "unknown_tower_phase",
          "error",
          `${towerPath}.phaseId`,
          "La torre referencia una fase inexistente.",
        );
      }

      tower.levels.forEach((level, levelIndex) => {
        const levelPath = `${towerPath}.levels[${levelIndex}]`;

        if (level.towerId !== tower.id) {
          addIssue(
            "invalid_level_tower_reference",
            "error",
            `${levelPath}.towerId`,
            "El nivel debe pertenecer a la torre que lo contiene.",
          );
        }

        level.apartments.forEach((apartment, apartmentIndex) => {
          const apartmentPath = `${levelPath}.apartments[${apartmentIndex}]`;

          if (
            apartment.projectId !== project.id ||
            apartment.towerId !== tower.id ||
            apartment.levelId !== level.id
          ) {
            addIssue(
              "invalid_apartment_parent_reference",
              "error",
              apartmentPath,
              "El apartamento contiene una referencia jerárquica inválida.",
            );
          }

          if (!modelIds.has(apartment.modelId)) {
            addIssue(
              "unknown_apartment_model",
              "error",
              `${apartmentPath}.modelId`,
              "El apartamento referencia un modelo inexistente.",
            );
          }

          validatePrices(apartment.prices, `${apartmentPath}.prices`, addIssue);
        });
      });
    });

    project.blocks.forEach((block, blockIndex) => {
      const blockPath = `${projectPath}.blocks[${blockIndex}]`;

      if (block.projectId !== project.id) {
        addIssue(
          "invalid_block_project_reference",
          "error",
          `${blockPath}.projectId`,
          "La manzana debe pertenecer al proyecto que la contiene.",
        );
      }

      if (block.phaseId && !phaseIds.has(block.phaseId)) {
        addIssue(
          "unknown_block_phase",
          "error",
          `${blockPath}.phaseId`,
          "La manzana referencia una fase inexistente.",
        );
      }

      block.lots.forEach((lot, lotIndex) => {
        const lotPath = `${blockPath}.lots[${lotIndex}]`;

        if (lot.projectId !== project.id || lot.blockId !== block.id) {
          addIssue(
            "invalid_lot_parent_reference",
            "error",
            lotPath,
            "El lote contiene una referencia jerárquica inválida.",
          );
        }

        if (lot.modelId && !modelIds.has(lot.modelId)) {
          addIssue(
            "unknown_lot_model",
            "error",
            `${lotPath}.modelId`,
            "El lote referencia un modelo inexistente.",
          );
        }

        validatePrices(lot.prices, `${lotPath}.prices`, addIssue);
      });
    });

    project.models.forEach((model, modelIndex) => {
      const modelPath = `${projectPath}.models[${modelIndex}]`;

      if (model.projectId !== project.id) {
        addIssue(
          "invalid_model_project_reference",
          "error",
          `${modelPath}.projectId`,
          "El modelo debe pertenecer al proyecto que lo contiene.",
        );
      }

      model.amenityIds?.forEach((amenityId) => {
        if (!amenityIds.has(amenityId)) {
          addIssue(
            "unknown_model_amenity",
            "warning",
            `${modelPath}.amenityIds`,
            `La amenidad "${amenityId}" no existe en el proyecto.`,
          );
        }
      });

      validatePrices(model.prices, `${modelPath}.prices`, addIssue);
    });

    validatePrices(project.prices, `${projectPath}.prices`, addIssue);
  });

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  return {
    isValid: errors.length === 0,
    issues,
    errors,
    warnings,
  };
}

// Ejemplo genérico y reemplazable: no contiene clientes, precios reales ni
// información privada del prospecto.
export const defaultDemoInventoryProfile: DemoInventoryProfile = {
  id: "safe-demo-inventory-profile",
  name: "Inventario inmobiliario demo",
  version: 1,
  isExample: true,
  source: {
    kind: "safe_example",
    notes:
      "Base segura para demostrar la futura captura de inventario desde una web pública.",
  },
  projects: [
    {
      id: "project-mixed-demo",
      name: "Proyecto Horizonte Demo",
      developmentType: "mixed",
      locationLabel: "Ubicación de ejemplo",
      description:
        "Proyecto ficticio con inventario vertical y horizontal para pruebas demo.",
      phases: [
        {
          id: "phase-demo-1",
          projectId: "project-mixed-demo",
          name: "Etapa demo 1",
          sequence: 1,
          status: "pre_sale",
          towerIds: ["tower-demo-a"],
          blockIds: ["block-demo-a"],
          amenityIds: ["amenity-demo-park"],
        },
      ],
      towers: [
        {
          id: "tower-demo-a",
          projectId: "project-mixed-demo",
          phaseId: "phase-demo-1",
          name: "Torre Demo A",
          levels: [
            {
              id: "level-demo-1",
              towerId: "tower-demo-a",
              name: "Nivel demo 1",
              number: 1,
              apartments: [
                {
                  id: "apartment-demo-a101",
                  projectId: "project-mixed-demo",
                  phaseId: "phase-demo-1",
                  towerId: "tower-demo-a",
                  levelId: "level-demo-1",
                  modelId: "model-demo-apartment",
                  code: "A-101-DEMO",
                  availability: {
                    status: "available",
                    label: "Disponible en demo",
                  },
                  prices: [],
                  areaM2: 72,
                },
              ],
            },
          ],
          amenityIds: ["amenity-demo-park"],
        },
      ],
      blocks: [
        {
          id: "block-demo-a",
          projectId: "project-mixed-demo",
          phaseId: "phase-demo-1",
          name: "Manzana Demo A",
          lots: [
            {
              id: "lot-demo-a01",
              projectId: "project-mixed-demo",
              phaseId: "phase-demo-1",
              blockId: "block-demo-a",
              modelId: "model-demo-lot",
              code: "LOTE-A01-DEMO",
              availability: {
                status: "not_released",
                label: "Próximo lanzamiento demo",
              },
              prices: [],
              lotAreaM2: 120,
            },
          ],
          amenityIds: ["amenity-demo-park"],
        },
      ],
      models: [
        {
          id: "model-demo-apartment",
          projectId: "project-mixed-demo",
          name: "Apartamento Demo",
          unitType: "apartment",
          bedrooms: 2,
          bathrooms: 2,
          constructionAreaM2: 72,
          prices: [],
          amenityIds: ["amenity-demo-park"],
        },
        {
          id: "model-demo-lot",
          projectId: "project-mixed-demo",
          name: "Lote Demo",
          unitType: "lot",
          lotAreaM2: 120,
          prices: [],
          amenityIds: ["amenity-demo-park"],
        },
      ],
      amenities: [
        {
          id: "amenity-demo-park",
          name: "Parque Demo",
          category: "nature",
          description: "Amenidad ficticia para estructurar escenarios demo.",
          phaseIds: ["phase-demo-1"],
          isHighlighted: true,
        },
      ],
      prices: [
        {
          id: "price-demo-reference",
          kind: "starting_at",
          label: "Precio demo por definir",
          notes: "No representa una oferta comercial ni un precio real.",
          isPublicReference: false,
        },
      ],
    },
  ],
};
