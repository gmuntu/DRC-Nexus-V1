/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import MineralBackground from './components/MineralBackground';
import { DNLogo } from './components/DNLogo';
import { 
  Shield, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Globe2, 
  Globe,
  Layers, 
  Users, 
  Building2, 
  HelpCircle, 
  ChevronRight, 
  X,
  Menu,
  Radio,
  Cpu,
  Lock,
  ExternalLink,
  Zap,
  Clock,
  ArrowUpRight,
  Leaf,
  Sparkles,
  Eye,
  Factory,
  Scale,
  BookOpen,
  TrendingUp,
  Mail,
  Send,
  Sun,
  Moon
} from 'lucide-react';

// Data types
type Language = 'EN' | 'FR';
type FeedTab = 'MANDATE' | 'MODEL' | 'ENGINE';
type NavTab = 'Home' | 'Pillars' | 'Markets' | 'Team' | 'Partners' | 'Contact';

interface HomeTabDetail {
  titleEn: string;
  titleFr: string;
  badgeEn: string;
  badgeFr: string;
  textEn: string;
  textFr: string;
}

interface Project {
  id: string;
  code: string;
  name: string;
  nameFr: string;
  province: string;
  sector: string;
  sectorFr: string;
  budget: string;
  status: 'Operational' | 'In Progress' | 'Planned' | 'Review';
  statusFr: 'Opérationnel' | 'En cours' | 'Planifié' | 'En révision';
  leadPartner: string;
  completion: number;
}

const HOME_TABS_CONTENT: Record<FeedTab, HomeTabDetail> = {
  MANDATE: {
    titleEn: 'U.S.-DRC Strategic Partnership Mandate',
    titleFr: 'Cadre réglementaire du partenariat stratégique RDC–États-Unis',
    badgeEn: 'POLICY & REGULATORY FRAMEWORK',
    badgeFr: 'CADRE INSTITUTIONNEL ET RÉGLEMENTAIRE',
    textEn: 'Built upon the historic U.S.-DRC Trade and Investment Strategic Partnership Agreement signed on December 4, 2025, our project is strategically positioned at the intersection of policy and progress. The agreement formally recognizes the DRC’s pivotal role in global critical mineral supply chains while mandating the formalization and industrialization of the artisanal mining sector—providing the ideal regulatory framework for our operations.',
    textFr: 'Dans le prolongement de l\'Accord de partenariat stratégique sur le commerce et l\'investissement conclu le 4 décembre 2025 entre la République démocratique du Congo et les États-Unis d\'Amérique, DRC Nexus s\'inscrit au cœur d\'un partenariat visant à renforcer la sécurité des chaînes d\'approvisionnement en minéraux stratégiques. Cet accord reconnaît le rôle central de la RDC dans l\'approvisionnement mondial en minéraux critiques et établit les bases d\'une formalisation de l\'exploitation artisanale, d\'une industrialisation progressive de la filière et d\'un cadre réglementaire durable, favorable à l\'investissement, à la traçabilité et à la création de valeur locale.'
  },
  MODEL: {
    titleEn: 'Low-Cost Extraction & Capital Attraction Model',
    titleFr: 'Modèle d\'exploitation à faible coût et mobilisation de capitaux',
    badgeEn: 'FINANCIAL & OPERATIONAL STRATEGY',
    badgeFr: 'STRATÉGIE FINANCIÈRE ET OPÉRATIONNELLE',
    textEn: 'Our competitive edge lies in the targeted exploitation of alluvial, surface, and near-surface mineral deposits, which offer significantly lower operating costs than traditional deep-lode mining. By pioneering a novel capital attraction model that channels direct investment into artisanal operations, we are achieving a historic first in global mining finance—merging ethical supply chain development with high-margin efficiency.',
    textFr: 'Notre avantage compétitif repose sur l\'exploitation optimisée de gisements alluvionnaires, sub-superficiels et superficiels, dont les coûts d\'exploitation sont sensiblement inférieurs à ceux des mines souterraines conventionnelles. En mobilisant des capitaux directement au bénéfice des coopératives minières artisanales, DRC Nexus propose un modèle de financement innovant qui associe performance économique, pratiques responsables et création de valeur durable.'
  },
  ENGINE: {
    titleEn: 'Cooperative Industrialization & Traceability Engine',
    titleFr: 'Industrialisation des coopératives et moteur de traçabilité',
    badgeEn: 'INDUSTRIAL SCALE & STANDARDS',
    badgeFr: 'INDUSTRIALISATION ET NORMES QUALITÉ',
    textEn: 'Driving operational scale, we are actively organizing small-scale miners into formal cooperatives. This structured approach standardizes extraction techniques, enforces rigorous safety and environmental protocols, and ensures full material traceability from source to export. By transforming fragmented artisanal efforts into cohesive, productive units, we unlock substantial economies of scale—turning manual labor into an industrialized, reliable supply chain that meets the stringent demands of global critical mineral buyers.',
    textFr: 'Pour accélérer la transformation opérationnelle du secteur artisanal, DRC Nexus structure les exploitants miniers au sein de coopératives formelles, encadrées selon des standards industriels. Ce modèle harmonise les pratiques d\'extraction, renforce la conformité environnementale et sécuritaire, et garantit la traçabilité complète des minerais, de la mine jusqu\'aux marchés internationaux. La consolidation des activités artisanales crée des économies d\'échelle et transforme une production dispersée en une chaîne d\'approvisionnement structurée, transparente et conforme aux exigences des acheteurs stratégiques.'
  }
};

const ALL_PROJECTS: Project[] = [
  {
    id: 'drc-us-corridor',
    code: 'NX-STRAT-001',
    name: 'DRC-U.S. Strategic Minerals Corridor',
    nameFr: 'Corridor Minier Stratégique RDC-USA',
    province: 'National / U.S. Supply Chain',
    sector: 'Strategic Minerals',
    sectorFr: 'Minéraux Stratégiques',
    budget: '$1.5B',
    status: 'Operational',
    statusFr: 'Opérationnel',
    leadPartner: 'DRC Nexus & U.S. End-Users',
    completion: 85
  },
  {
    id: 'p-1',
    code: 'NX-ENG-082',
    name: 'Great Lakes Solar Grid',
    nameFr: 'Réseau Solaire des Grands Lacs',
    province: 'North Kivu',
    sector: 'Clean Energy',
    sectorFr: 'Énergie Propre',
    budget: '$180M',
    status: 'Operational',
    statusFr: 'Opérationnel',
    leadPartner: 'EU / ADB',
    completion: 92
  },
  {
    id: 'p-2',
    code: 'NX-LOG-104',
    name: 'Eastern Rail Logistics Corridor',
    nameFr: 'Corridor Logistique Ferroviaire Est',
    province: 'Ituri & Haut-Uele',
    sector: 'Transport',
    sectorFr: 'Transport',
    budget: '$640M',
    status: 'In Progress',
    statusFr: 'En cours',
    leadPartner: 'World Bank',
    completion: 64
  },
  {
    id: 'p-3',
    code: 'NX-HLT-019',
    name: 'Central Province Telecom Health Net',
    nameFr: 'Réseau Télécom Santé Centre',
    province: 'Kasaï Central',
    sector: 'Digital Health',
    sectorFr: 'Santé Numérique',
    budget: '$95M',
    status: 'In Progress',
    statusFr: 'En cours',
    leadPartner: 'Global Fund & UNDP',
    completion: 78
  },
  {
    id: 'p-4',
    code: 'NX-AGR-302',
    name: 'Congo Basin Agro-Tech Reserve',
    nameFr: 'Réserve Agro-Tech du Bassin du Congo',
    province: 'Équateur',
    sector: 'Agritech',
    sectorFr: 'AgriTech',
    budget: '$210M',
    status: 'Planned',
    statusFr: 'Planifié',
    leadPartner: 'FAO / AfDB',
    completion: 25
  },
  {
    id: 'p-5',
    code: 'NX-WTR-045',
    name: 'Lualaba Clean Water Aqueduct',
    nameFr: 'Aqueduc d\'Eau Douce du Lualaba',
    province: 'Lualaba',
    sector: 'Water & Sanitation',
    sectorFr: 'Eau & Assainissement',
    budget: '$340M',
    status: 'Operational',
    statusFr: 'Opérationnel',
    leadPartner: 'UNICEF & USAID',
    completion: 100
  },
  {
    id: 'p-6',
    code: 'NX-MIN-112',
    name: 'Transparent Mineral Traceability System',
    nameFr: 'Traçabilité Minérale Transparente',
    province: 'Haut-Katanga',
    sector: 'Mining Oversight',
    sectorFr: 'Contrôle Minier',
    budget: '$115M',
    status: 'Review',
    statusFr: 'En révision',
    leadPartner: 'EITI / DRC Gov',
    completion: 45
  }
];

interface LeadershipPartner {
  id: string;
  categoryEn: string;
  categoryFr: string;
  partnerEn: string;
  partnerFr: string;
  leadEn?: string;
  leadFr?: string;
  descriptionEn: string;
  descriptionFr: string;
}

const LEADERSHIP_PARTNERS: LeadershipPartner[] = [
  {
    id: 'project-lead',
    categoryEn: 'PROJECT LEAD',
    categoryFr: 'DIRECTION DU PROJET',
    partnerEn: 'DRC Nexus',
    partnerFr: 'DRC Nexus',
    descriptionEn: "A veteran conflict-mineral advocate with decades of DRC experience, Ghislain anchors the ethical governance of the SM-EZs—enforcing fair labor, community development, and conflict-free sourcing. Registered as a U.S. lobbyist under FARA #7541, he strategically aligns DRC stakeholder interests with U.S. policy, ensuring transparency and trust from the mine to the market.",
    descriptionFr: "Spécialiste chevronné des minéraux de conflit fort de plusieurs décennies d'expérience sur le territoire congolais, Ghislain supervise la gouvernance éthique des Zones Économiques de Minéraux Stratégiques (ZE-MS). Enregistré auprès du Département de la Justice des États-Unis en qualité de représentant stratégique (FARA #7541), il harmonise les orientations des parties prenantes congolaises avec les politiques industrielles américaines, garantissant la transparence, la conformité juridique et la confiance mutuelle du gisement jusqu'au marché."
  },
  {
    id: 'exploration-mining',
    categoryEn: 'MINING & EXPLORATION',
    categoryFr: 'EXPLORATION ET INGÉNIERIE MINIÈRE',
    partnerEn: 'Rare Earth Strategic Minerals Inc.',
    partnerFr: 'Rare Earth Strategic Minerals Inc.',
    descriptionEn: "North American mineral exploration leader led by Canadian mining veteran Len Harris (50+ years' experience). Specializes in sustainable mining practices that minimize environmental impact while maximizing resource recovery.",
    descriptionFr: "Acteur nord-américain de référence en exploration minérale, placé sous la conduite de M. Len Harris, expert minier canadien fort de plus de cinquante années d'expérience. La société déploie des méthodologies d'extraction écoresponsables visant l'optimisation des taux de récupération métallurgique dans le respect rigoureux de la biodiversité."
  },
  {
    id: 'financing-investment',
    categoryEn: 'FINANCING & INVESTMENT',
    categoryFr: 'INGÉNIERIE FINANCIÈRE ET INVESTISSEMENT',
    partnerEn: 'Elham International Trading Africa',
    partnerFr: 'Elham International Trading Africa',
    leadEn: 'Under the leadership of Shamiel Ahmed',
    leadFr: 'Sous la haute direction de M. Shamiel Ahmed',
    descriptionEn: "Under the leadership of Shamiel Ahmed, Elham International Trading Africa structures and secures complex financing for major infrastructure and development projects across South Africa, Nigeria, and Ghana. Backed by a robust global trade and finance network, Elham drives the critical capital flow needed to power large-scale initiatives—while its deep-rooted intelligence in local African markets ensures every financial solution is strategically deployed and fully integrated into regional business ecosystems.",
    descriptionFr: "Sous la direction de M. Shamiel Ahmed, Elham International Trading Africa structure l'ingénierie financière de projets d'infrastructures d'envergure en Afrique subsaharienne. Adossée à un réseau international de négoce et de haute finance, l'institution orchestre le déploiement ciblé des capitaux essentiels à la concrétisation d'initiatives stratégiques, garantissant une intégration harmonieuse au sein des écosystèmes économiques régionaux."
  },
  {
    id: 'ai-satellite',
    categoryEn: 'AI, SATELLITE',
    categoryFr: 'IMAGERIE SATELLITAIRE ET IA',
    partnerEn: 'Geo Sat',
    partnerFr: 'Geo Sat',
    descriptionEn: "Led by Frank Genin, PhD, a geoscientist and geopolitician specializing in mining geophysics via satellite. Using SAR-derived structural mapping with geode sensors and multi-element soil geochemistry via drone sampling, this technology can compress a traditional 5-year exploration program into 18 months.",
    descriptionFr: "Présidée par le Dr Frank Genin, docteur en géosciences et géopolitologue spécialisé en géophysique spatiale appliquée au secteur minier. L'entreprise combine la cartographie radar à synthèse d'ouverture (RSO), les capteurs géodésiques et la géochimie aéroportée par drone, réduisant la durée des campagnes d'exploration conventionnelles de cinq années à dix-huit mois."
  },
  {
    id: 'refining-processing',
    categoryEn: 'REFINING & PROCESSING',
    categoryFr: 'RAFFINAGE ET TRAITEMENT MÉTALLURGIQUE',
    partnerEn: 'Electrochem Technologies & Materials Inc.',
    partnerFr: 'Electrochem Technologies & Materials Inc.',
    descriptionEn: "We are actively in negotiations with Electrochem Technologies & Materials Inc., a Montreal-based firm led by François Cardarelli. Specializing in clean and energy-efficient refining, their proprietary technologies are designed to maximize recovery rates while cutting energy use and minimizing environmental waste.",
    descriptionFr: "Négociations stratégiques avancées avec Electrochem Technologies & Materials Inc. (Montréal, sous la direction de M. François Cardarelli). Spécialisée dans la métallurgie propre et éco-efficace, l'entreprise déploie des procédés électrochimiques brevetés maximisant le rendement d'extraction tout en réduisant considérablement la consommation énergétique et l'empreinte écologique."
  }
];

const STRATEGIC_PARTNERS = [
  { name: 'UNDP', type: 'Multilateral Agency', typeFr: 'Organisme Multilatéral', code: 'UN' },
  { name: 'World Bank', type: 'Financial Institution', typeFr: 'Institution Financière Internationale', code: 'WB' },
  { name: 'AfDB', type: 'Development Bank', typeFr: 'Banque Multilatérale de Développement', code: 'AfDB' },
  { name: 'EU Dev', type: 'International Cooperation', typeFr: 'Coopération Internationale', code: 'EU' },
  { name: 'SADC', type: 'Regional Community', typeFr: 'Communauté Économique Régionale', code: 'SADC' }
];

const DRC_MINERAL_MARKET_INDEX = [
  {
    symbol: 'Co',
    nameEn: 'Cobalt',
    nameFr: 'Cobalt',
    price: '$28,450',
    unit: 'MT',
    change: '+2.8%',
    isPositive: true,
    drcShareEn: '70% Global Supply',
    drcShareFr: '70 % de l\'Offre Mondiale',
    category: 'BATTERY',
    benchmarkEn: 'LME Cobalt Cash ($/MT)',
    benchmarkFr: 'LME Cobalt au Comptant ($/T)',
    appUseEn: 'EV Lithium-ion Cathodes, Energy Storage, Superalloys',
    appUseFr: 'Cathodes Lithium-ion pour Véhicules Électriques, Stockage d\'Énergie, Superalliages Aéronautiques',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    symbol: 'Ta',
    nameEn: 'Tantalum (Coltan)',
    nameFr: 'Tantale (Coltan)',
    price: '$215',
    unit: 'kg',
    change: '+1.6%',
    isPositive: true,
    drcShareEn: '40% Global Reserve',
    drcShareFr: '40 % des Réserves Mondiales',
    category: '3T',
    benchmarkEn: 'SMM Tantalite Powder 30% ($/kg)',
    benchmarkFr: 'Poudre de Tantalite SMM 30 % ($/kg)',
    appUseEn: 'Miniature Capacitors, Smartphones, Medical & Aerospace',
    appUseFr: 'Condensateurs Miniatures, Télécommunications, Électronique Médicale et Aérospatiale',
    bgImage: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&w=600&q=80'
  },
  {
    symbol: 'Cu',
    nameEn: 'Copper',
    nameFr: 'Cuivre',
    price: '$9,840',
    unit: 'MT',
    change: '+0.9%',
    isPositive: true,
    drcShareEn: '#2 Global Producer',
    drcShareFr: '2e Producteur Mondial',
    category: 'BATTERY',
    benchmarkEn: 'LME Copper Grade A ($/MT)',
    benchmarkFr: 'Cuivre LME Grade A ($/T)',
    appUseEn: 'Electrical Grids, EV Wiring Harnesses, Solar & Wind Infrastructure',
    appUseFr: 'Infrastructures de Réseaux, Câblage Haute Tension, Technologies Éoliennes et Solaires',
    bgImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80'
  },
  {
    symbol: 'Li',
    nameEn: 'Lithium',
    nameFr: 'Lithium',
    price: '$14,250',
    unit: 'MT',
    change: '+0.4%',
    isPositive: true,
    drcShareEn: 'Manono World Deposit',
    drcShareFr: 'Gisement d\'Envergure Mondiale (Manono)',
    category: 'BATTERY',
    benchmarkEn: 'Fastmarkets Lithium Carbonate 99.5% ($/MT)',
    benchmarkFr: 'Fastmarkets Carbonate de Lithium 99.5 % ($/T)',
    appUseEn: 'Next-Gen Battery Chemistries, Grid-Scale BESS',
    appUseFr: 'Chimies de Batteries de Nouvelle Génération, Systèmes BESS d\'Échelle Industrielle',
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    symbol: 'Ni',
    nameEn: 'Nickel',
    nameFr: 'Nickel',
    price: '$16,180',
    unit: 'MT',
    change: '+1.1%',
    isPositive: true,
    drcShareEn: 'Katanga Nickel Belt',
    drcShareFr: 'Ceinture Métallogénique du Katanga',
    category: 'BATTERY',
    benchmarkEn: 'LME Nickel Class 1 ($/MT)',
    benchmarkFr: 'Nickel LME Classe 1 ($/T)',
    appUseEn: 'High-Density NMC Cathodes, Stainless Steel Alloys',
    appUseFr: 'Cathodes NMC à Haute Densité Énergétique, Alliages d\'Acier Inoxydable Spécialisés',
    bgImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80'
  },
  {
    symbol: 'Sn',
    nameEn: 'Tin (Cassiterite)',
    nameFr: 'Étain (Cassitérite)',
    price: '$32,150',
    unit: 'MT',
    change: '+2.4%',
    isPositive: true,
    drcShareEn: '3T Strategic Supply',
    drcShareFr: 'Approvisionnement Stratégique 3T',
    category: '3T',
    benchmarkEn: 'LME Tin Cash ($/MT)',
    benchmarkFr: 'Étain LME au Comptant ($/T)',
    appUseEn: 'Lead-Free Electronics Soldering, Semiconductor Packaging',
    appUseFr: 'Brasures Électroniques Sans Plomb, Encapsulation des Semi-conducteurs',
    bgImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80'
  },
  {
    symbol: 'W',
    nameEn: 'Tungsten',
    nameFr: 'Tungstène',
    price: '$335',
    unit: 'MTU',
    change: '+1.8%',
    isPositive: true,
    drcShareEn: '3T Critical Industry',
    drcShareFr: 'Filière Critique 3T',
    category: '3T',
    benchmarkEn: 'Fastmarkets Tungsten APT ($/MTU)',
    benchmarkFr: 'Fastmarkets Tungstène APT ($/MTU)',
    appUseEn: 'High-Temperature Drills, Defense Systems, Heavy Industry',
    appUseFr: 'Outillages à Haute Résistance Thermique, Équipements de Défense, Industrie Lourde',
    bgImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80'
  },
  {
    symbol: 'Ge',
    nameEn: 'Germanium',
    nameFr: 'Germanium',
    price: '$1,820',
    unit: 'kg',
    change: '+3.2%',
    isPositive: true,
    drcShareEn: 'Semiconductor Optics',
    drcShareFr: 'Composants pour Optique de Semi-conducteurs',
    category: 'SEMICONDUCTOR',
    benchmarkEn: 'Fastmarkets Germanium Metal 99.99% ($/kg)',
    benchmarkFr: 'Germanium Métal Fastmarkets 99.99 % ($/kg)',
    appUseEn: 'Fiber Optic Networks, Infrared Defense Optics, Solar Cells',
    appUseFr: 'Réseaux de Fibre Optique, Dispositifs Optroniques Infrarouges de Défense, Cellules Photovoltaïques',
    bgImage: 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?auto=format&fit=crop&w=600&q=80'
  }
];

const CORE_VALUES = [
  {
    icon: Shield,
    titleEn: "Ethical Sourcing",
    titleFr: "Approvisionnement Éthique et Responsable",
    descEn: "We ensure all minerals are sourced responsibly, with fair labor practices and transparent supply chains.",
    descFr: "Supervision rigoureuse de l'intégralité de la chaîne d'approvisionnement visant à garantir la dignité du travail, l'éradication des conflits et la traçabilité irréprochable des ressources."
  },
  {
    icon: Leaf,
    titleEn: "Environmental Stewardship",
    titleFr: "Préservation et Éco-Responsabilité",
    descEn: "Our operations minimize ecological impact and promote restoration and conservation efforts.",
    descFr: "Mise en œuvre de méthodologies à empreinte écologique maîtrisée et soutien actif aux programmes de réhabilitation environnementale."
  },
  {
    icon: Users,
    titleEn: "Community Development",
    titleFr: "Développement Communautaire Territorial",
    descEn: "We invest in local communities, creating jobs and supporting education and healthcare initiatives.",
    descFr: "Investissements structurants dans les provinces riveraines pour stimuler l'emploi pérenne, renforcer l'offre éducative et moderniser les infrastructures de santé."
  },
  {
    icon: Sparkles,
    titleEn: "Innovation",
    titleFr: "Innovation et Excellence Technologique",
    descEn: "We continuously develop and implement cutting-edge technologies to improve efficiency and sustainability.",
    descFr: "Déploiement continu de technologies de pointe visant l'optimisation des rendements d'extraction, du raffinage et des processus de traçabilité numérique."
  },
  {
    icon: Eye,
    titleEn: "Transparency",
    titleFr: "Transparence et Haute Gouvernance",
    descEn: "We maintain open communication with all stakeholders and adhere to the highest standards of corporate governance.",
    descFr: "Adhésion stricte aux standards internationaux de gouvernance d'entreprise et maintien d'un dialogue institutionnel fluide avec l'ensemble des parties prenantes."
  },
  {
    icon: Clock,
    titleEn: "Long-term Vision",
    titleFr: "Pérennité et Vision Stratégique",
    descEn: "We build for the future, creating sustainable value for partners and communities for generations to come.",
    descFr: "Création de valeur partagée durable s'inscrivant dans la durée au bénéfice des générations futures et des partenaires institutionnels."
  }
];

type PartnerCategory = 'Government' | 'Private' | 'Communities';

interface PartnerCategoryData {
  id: PartnerCategory;
  titleEn: string;
  titleFr: string;
  subtitleEn: string;
  subtitleFr: string;
  partners: {
    nameEn: string;
    nameFr: string;
    icon: any;
    descEn: string;
    descFr: string;
  }[];
}

const PARTNER_CATEGORIES: PartnerCategoryData[] = [
  {
    id: 'Government',
    titleEn: 'Government',
    titleFr: 'Secteur Public',
    subtitleEn: 'Strategic partnerships with government institutions ensuring compliance and sustainable development.',
    subtitleFr: 'Partenariats institutionnels et souverains garantissant la conformité réglementaire et la sécurité juridique.',
    partners: [
      {
        nameEn: 'Congolese Government',
        nameFr: 'Gouvernement de la République Démocratique du Congo',
        icon: Building2,
        descEn: 'Official support and regulatory framework for our operations in the DRC, ensuring compliance with national priorities and development goals.',
        descFr: 'Ancrage institutionnel et cadre souverain régissant nos activités en RDC, assurant une parfaite adéquation avec les orientations stratégiques nationales.'
      },
      {
        nameEn: 'U.S. Defense Logistics Agency (DLA)',
        nameFr: 'U.S. Defense Logistics Agency (DLA)',
        icon: Shield,
        descEn: 'Procurement budgets for tantalum, cobalt, and antimony.',
        descFr: 'Programmes et allocations d\'approvisionnement stratégique en tantale, cobalt et antimoine pour la réserve de défense.'
      },
      {
        nameEn: 'Congo Ressources SA',
        nameFr: 'Congo Ressources SA',
        icon: Building2,
        descEn: 'A state-owned enterprise created in 2022 under the Ministry of Portfolio, tasked with valorizing dormant mining assets.',
        descFr: 'Société d\'État créée sous l\'égide du Ministère du Portefeuille, mandatée pour la valorisation des actifs miniers nationaux.'
      },
      {
        nameEn: 'U.S. Department of Defense',
        nameFr: 'Département de la Défense des États-Unis (DoD)',
        icon: Shield,
        descEn: 'Collaboration on securing strategic mineral supply chains for national security applications and defense technologies.',
        descFr: 'Coopération axée sur la sécurisation des chaînes d\'approvisionnement en minéraux stratégiques destinés aux applications technologiques et de défense souveraine.'
      },
      {
        nameEn: 'U.S. Department of Energy',
        nameFr: 'Département de l\'Énergie des États-Unis (DoE)',
        icon: Building2,
        descEn: 'Partnership on developing sustainable energy solutions and securing minerals essential for the energy transition.',
        descFr: 'Partenariat axé sur le développement de technologies énergétiques avancées et l\'approvisionnement en métaux critiques de la transition.'
      },
      {
        nameEn: 'U.S. Geological Survey (USGS)',
        nameFr: 'U.S. Geological Survey (USGS)',
        icon: Globe,
        descEn: "Partnering with the U.S. Geological Survey (USGS) to strengthen Stardot's AI-powered national mining map of the DRC—ensuring scientific accuracy, data transparency, and alignment with global geological standards.",
        descFr: "Collaboration scientifique d\'excellence visant à renforcer la cartographie minière par intelligence artificielle et à garantir la rigueur géologique globale."
      }
    ]
  },
  {
    id: 'Private',
    titleEn: 'Private',
    titleFr: 'Secteur Privé & Industrie',
    subtitleEn: 'Collaborations with industry leaders in mining, technology, and manufacturing.',
    subtitleFr: 'Synergies industrielles avec les leaders mondiaux de l\'exploitation, de la haute technologie et de la transformation.',
    partners: [
      {
        nameEn: 'DRC Mining Firms',
        nameFr: 'Sociétés Minières de RDC',
        icon: Factory,
        descEn: 'Local mining companies with established operations and deep knowledge of the Congolese mining sector, providing operational support and local expertise.',
        descFr: 'Sociétés minières locales disposant d\'un ancrage territorial fort et d\'une parfaite maîtrise des contextes géologiques et opérationnels.'
      },
      {
        nameEn: 'U.S. Technology Companies',
        nameFr: 'Entreprises Technologiques Américaines',
        icon: Factory,
        descEn: 'Leading technology firms requiring secure access to strategic minerals for manufacturing advanced electronics, batteries, and renewable energy systems.',
        descFr: 'Conglomérats industriels nécessitant un accès sécurisé et prévisible aux minéraux stratégiques pour la fabrication de semi-conducteurs et de batteries.'
      },
      {
        nameEn: 'U.S. Defense Contractors',
        nameFr: 'Industriels de la Défense Américaine',
        icon: Shield,
        descEn: 'Major defense industry players seeking reliable sources of strategic minerals for advanced weapons systems and military technologies.',
        descFr: 'Acteurs majeurs de la base industrielle de défense exigeant des métaux de haute pureté pour les systèmes stratégiques.'
      },
      {
        nameEn: 'International Logistics Providers',
        nameFr: 'Opérateurs de Logistique Internationale',
        icon: Factory,
        descEn: 'Specialized transportation and logistics companies with experience in moving valuable cargo across challenging environments and international borders.',
        descFr: 'Prestataires spécialisés garantissant la sécurisation et le transit fluide des cargaisons minérales à travers les corridors internationaux.'
      },
      {
        nameEn: 'Automakers',
        nameFr: 'Constructeurs Automobiles Majeurs',
        icon: Factory,
        descEn: 'U.S. automakers are key end users of strategic minerals like lithium, nickel, and rare earth elements for electric vehicle and battery production. Their demand anchors investment in upstream and midstream supply chains.',
        descFr: 'Acheteurs finaux stratégiques de cobalt, lithium et terres rares nécessaires à la production de chaînes de traction électriques.'
      },
      {
        nameEn: 'Refining Companies',
        nameFr: 'Raffineries et Unités Métallurgiques',
        icon: Factory,
        descEn: 'Refining companies are emerging end users of critical minerals required for battery-grade material processing and low-carbon fuel production.',
        descFr: 'Entités de transformation assurant le passage des concentrés minéraux bruts aux métaux de qualité industrielle supérieure.'
      }
    ]
  },
  {
    id: 'Communities',
    titleEn: "Communities & NGO's",
    titleFr: "Communautés & Société Civile",
    subtitleEn: 'Partnerships that ensure ethical practices and community development.',
    subtitleFr: 'Engagement éthique et programmes de développement territorial auprès de la société civile et des communautés locales.',
    partners: [
      {
        nameEn: 'Local Communities',
        nameFr: 'Communautés Locales et Riveraines',
        icon: Users,
        descEn: 'Direct engagement with communities in mining regions, ensuring fair benefits, employment opportunities, and sustainable development initiatives.',
        descFr: 'Concertation permanente avec les populations des zones d\'extraction, garantissant des retombées socio-économiques directes et des emplois locaux qualifiés.'
      },
      {
        nameEn: 'Environmental Organizations',
        nameFr: 'Organisations de Protection de l\'Environnement',
        icon: Leaf,
        descEn: 'Collaboration with environmental NGOs to implement best practices in ecological protection, restoration, and sustainable mining operations.',
        descFr: 'Collaboration étroite avec les ONG spécialisées pour la mise en œuvre des meilleures pratiques de conservation et de restauration écologique.'
      },
      {
        nameEn: 'Human Rights Monitors',
        nameFr: 'Observateurs Indépendants des Droits Humains',
        icon: Scale,
        descEn: 'Independent organizations that verify our compliance with human rights standards and ethical labor practices throughout the supply chain.',
        descFr: 'Organismes indépendants évaluant et certifiant la stricte conformité aux normes sociales internationales tout au long de la chaîne de valeur.'
      },
      {
        nameEn: 'Educational Institutions',
        nameFr: 'Institutions Académiques et de Recherche',
        icon: BookOpen,
        descEn: 'Partnerships with universities and technical schools to develop local talent and advance research in sustainable mining and processing technologies.',
        descFr: 'Partenariats universitaires pour le transfert de compétences, la recherche scientifique et la formation de cadres techniques locaux.'
      }
    ]
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>('EN');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeNav, setActiveNav] = useState<NavTab>('Home');
  const [activeFeedTab, setActiveFeedTab] = useState<FeedTab>('MANDATE');
  const [selectedPartnerCategory, setSelectedPartnerCategory] = useState<PartnerCategory>('Government');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLight = theme === 'light';

  // Modals
  const [isHubModalOpen, setIsHubModalOpen] = useState(false);
  const [isIntelNetworkOpen, setIsIntelNetworkOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMineral, setSelectedMineral] = useState('cobalt');
  const [customMineral, setCustomMineral] = useState('');
  const [expandedTeamCard, setExpandedTeamCard] = useState<string | null>(null);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Markets Page State
  const [marketSearch, setMarketSearch] = useState('');
  const [selectedMarketCategory, setSelectedMarketCategory] = useState<'ALL' | 'BATTERY' | '3T' | 'SEMICONDUCTOR'>('ALL');

  const isFr = lang === 'FR';

  const filteredProjects = ALL_PROJECTS.filter(p => {
    const q = projectSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.nameFr.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.province.toLowerCase().includes(q) ||
      p.sector.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`min-h-screen h-full flex flex-col font-sans antialiased relative transition-colors duration-300 ${isLight ? 'light-theme bg-[#F2EEE9] text-slate-900' : 'bg-[#0B0F17] text-slate-100'}`}>
      {/* Interactive Mineral Canvas Background across all pages */}
      <MineralBackground isLight={isLight} />

      {/* Navigation Header */}
      <nav className={`h-22 px-6 md:px-10 flex items-center justify-between border-b backdrop-blur-md shrink-0 sticky top-0 z-30 shadow-md transition-colors duration-300 ${isLight ? 'bg-white/95 border-slate-200/90 text-slate-800' : 'bg-[#0B0F17]/90 border-slate-800/80 text-slate-100'}`}>
        <button onClick={() => setActiveNav('Home')} className="cursor-pointer focus:outline-none flex items-center justify-center">
          <DNLogo size="md" isFr={isFr} isLight={isLight} layout="horizontal" />
        </button>

        {/* Navigation Links */}
        <div className={`hidden md:flex items-center gap-9 text-base md:text-lg font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {(['Home', 'Pillars', 'Markets', 'Team', 'Partners', 'Contact'] as NavTab[]).map((tab) => {
            const labelMap: Record<NavTab, { en: string; fr: string }> = {
              Home: { en: 'Home', fr: 'Accueil' },
              Pillars: { en: 'Pillars', fr: 'Piliers' },
              Markets: { en: 'Markets', fr: 'Marchés' },
              Team: { en: 'Team', fr: 'Équipe' },
              Partners: { en: 'Partners', fr: 'Partenaires' },
              Contact: { en: 'Contact', fr: 'Contact' }
            };
            const isActive = activeNav === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveNav(tab)}
                className={`py-5 transition-colors relative cursor-pointer ${
                  isActive
                    ? isLight ? 'text-amber-900 font-black' : 'text-[#E5C188] font-black'
                    : isLight ? 'hover:text-slate-900 text-slate-700 font-bold' : 'hover:text-white text-slate-300 font-semibold'
                }`}
              >
                {labelMap[tab][isFr ? 'fr' : 'en']}
                {isActive && (
                  <span className={`absolute bottom-0 left-0 w-full h-1 rounded-full ${isLight ? 'bg-amber-600' : 'bg-[#C8A97E]'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Switcher Toggle Control */}
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className={`px-4 py-2 rounded-full border text-xs md:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
              isLight
                ? 'bg-amber-100/90 hover:bg-amber-200/90 border-amber-300/90 text-amber-950'
                : 'bg-[#131B2E] hover:bg-slate-800 border-slate-700/80 text-slate-200'
            }`}
            title={isFr ? (isLight ? 'Passer en mode sombre' : 'Passer en mode clair') : (isLight ? 'Switch to dark mode' : 'Switch to light mode')}
          >
            {isLight ? (
              <>
                <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-amber-950 font-black">{isFr ? 'Mode Clair' : 'Light Mode'}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-200 font-bold">{isFr ? 'Mode Sombre' : 'Dark Mode'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
            className={`px-4 py-2 rounded-full border text-xs md:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                : 'bg-[#131B2E] hover:bg-slate-800 border-slate-700/80 text-slate-200'
            }`}
            title={isFr ? 'Changer de langue' : 'Switch language'}
          >
            <span className={lang === 'FR' ? (isLight ? 'text-amber-900 font-black' : 'text-[#E5C188] font-black') : 'text-slate-400'}>FR</span>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>/</span>
            <span className={lang === 'EN' ? (isLight ? 'text-amber-900 font-black' : 'text-[#E5C188] font-black') : 'text-slate-400'}>EN</span>
          </button>

          <button
            onClick={() => setActiveNav('Contact')}
            className="hidden sm:flex bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] hover:from-[#1E40AF] hover:to-[#2563EB] text-white px-6 py-2.5 rounded-full text-xs md:text-sm font-extrabold transition-all shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer items-center justify-center border border-blue-400/40 uppercase tracking-wider"
          >
            <span>{isFr ? 'Contact' : 'Contact'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl border transition-all cursor-pointer focus:outline-none ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                : 'bg-[#131B2E] hover:bg-slate-800 border-slate-700/80 text-slate-200'
            }`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-amber-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown Showcase */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-b px-6 py-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 sticky top-22 z-20 ${
          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0D1322] border-slate-800/90 text-slate-100'
        }`}>
          <div className="flex flex-col gap-2">
            {(['Home', 'Pillars', 'Markets', 'Team', 'Partners', 'Contact'] as NavTab[]).map((tab) => {
              const labelMap: Record<NavTab, { en: string; fr: string }> = {
                Home: { en: 'Home', fr: 'Accueil' },
                Pillars: { en: 'Pillars', fr: 'Piliers' },
                Markets: { en: 'Markets', fr: 'Marchés' },
                Team: { en: 'Team', fr: 'Équipe' },
                Partners: { en: 'Partners', fr: 'Partenaires' },
                Contact: { en: 'Contact', fr: 'Contact' }
              };
              const isActive = activeNav === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveNav(tab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-5 py-3.5 rounded-xl text-left font-extrabold text-base transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? isLight
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-sm'
                        : 'bg-[#18233D] text-[#FBBF24] border border-[#FBBF24]/50 shadow-md'
                      : isLight
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span>{labelMap[tab][isFr ? 'fr' : 'en']}</span>
                  {isActive && <span className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-amber-600' : 'bg-[#FBBF24]'}`} />}
                </button>
              );
            })}

            {/* Mobile Theme Switcher */}
            <div className={`pt-4 border-t flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <span className={`text-sm font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {isFr ? 'Thème d\'affichage' : 'Display Theme'}
              </span>
              <button
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                className={`px-4 py-2 rounded-full border text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                  isLight
                    ? 'bg-amber-100 border-amber-300 text-amber-950'
                    : 'bg-[#18233D] border-slate-700 text-slate-200'
                }`}
              >
                {isLight ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-amber-400" />}
                <span>{isLight ? (isFr ? 'Mode Clair' : 'Light Mode') : (isFr ? 'Mode Sombre' : 'Dark Mode')}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setActiveNav('Contact');
                setIsMobileMenuOpen(false);
              }}
              className="mt-3 w-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] text-white py-3.5 px-6 rounded-full text-sm font-extrabold transition-all shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer flex items-center justify-center border border-blue-400/40 uppercase tracking-wider"
            >
              <span>{isFr ? 'Contact' : 'Contact'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {activeNav === 'Home' && (
          <div className="max-w-7xl mx-auto w-full p-6 md:p-10 space-y-12">
            {/* Centered Hero Section */}
            <div className="text-center pt-8 pb-4 max-w-5xl mx-auto flex flex-col items-center">
              {/* Main Headline */}
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight mb-8 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isFr ? (
                  <>Un Partenariat Stratégique pour les Minéraux de Demain</>
                ) : (
                  <>Securing Strategic Minerals for America's Future</>
                )}
              </h1>

              {/* Core Business Definition Card */}
              <div className={`w-full rounded-3xl border p-8 md:p-10 relative overflow-hidden shadow-2xl my-6 text-center sm:text-left flex flex-col sm:flex-row items-center gap-8 group transition-all ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-[#131B2E]/90 border-slate-800/90 hover:border-slate-700/80 text-slate-100'
              }`}>
                <div className="space-y-3 w-full">
                  <div className="flex items-center justify-center sm:justify-start gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${isLight ? 'bg-amber-700' : 'bg-[#FBBF24]'}`} />
                    <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-widest block ${
                      isLight ? 'text-amber-900' : 'text-[#E5C188]'
                    }`}>
                      {isFr ? 'MODÈLE D\'EXÉCUTION INTÉGRÉ' : 'INTEGRATED EXECUTION MODEL'}
                    </span>
                  </div>
                  <blockquote className={`text-xl md:text-2xl lg:text-3xl font-extrabold leading-snug tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    "{isFr 
                      ? 'Un modèle intégré alliant diplomatie bilatérale, extraction compétitive et industrialisation coopérative.'
                      : 'An integrated execution model bridging bilateral diplomacy, low-cost extraction, and cooperative industrialization.'}"
                  </blockquote>
                  <p className={`text-base md:text-lg font-sans leading-relaxed pt-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {isFr
                      ? 'DRC Nexus déploie une chaîne d\'approvisionnement intégrée verticalement, reliant les ressources stratégiques de la RDC aux utilisateurs finaux américains.'
                      : 'DRC Nexus is establishing a vertically integrated supply chain for strategic minerals from the DRC to U.S. end-users.'}
                  </p>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-5 mt-8 mb-4">
                <button
                  onClick={() => setActiveNav('Pillars')}
                  className={`px-8 py-4 rounded-full text-base md:text-lg font-extrabold transition-all shadow-lg active:scale-95 cursor-pointer border ${
                    isLight
                      ? 'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] hover:from-[#1E40AF] hover:to-[#2563EB] text-white border-blue-400/40 shadow-blue-600/20'
                      : 'bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white border-blue-400/20'
                  }`}
                >
                  <span>{isFr ? 'Consulter nos Piliers Stratégiques' : 'Explore Core Pillars'}</span>
                </button>

                <button
                  onClick={() => setActiveNav('Markets')}
                  className={`px-8 py-4 rounded-full text-base md:text-lg font-extrabold transition-all border active:scale-95 cursor-pointer shadow-sm ${
                    isLight
                      ? 'bg-amber-100/90 hover:bg-amber-200/90 text-amber-950 border-amber-300'
                      : 'bg-[#131B2E] hover:bg-[#18233D] text-[#FBBF24] border-slate-700/80'
                  }`}
                >
                  <span>{isFr ? 'Suivi des Cours des Minéraux' : 'Live Market Price Tracking'}</span>
                </button>

                <button
                  onClick={() => setActiveNav('Contact')}
                  className={`px-8 py-4 rounded-full text-base md:text-lg font-extrabold transition-all border active:scale-95 cursor-pointer ${
                    isLight
                      ? 'bg-slate-200/80 hover:bg-slate-300/80 text-slate-800 border-slate-300'
                      : 'bg-[#131B2E] hover:bg-slate-800 text-slate-200 border-slate-700/80'
                  }`}
                >
                  <span>{isFr ? 'Prendre Contact' : 'Contact Strategy Team'}</span>
                </button>
              </div>
            </div>

            {/* Core Pillars High-Level Summary (3 Columns) */}
            <div className="space-y-8 pt-4">
              <div className={`flex items-center justify-between border-b pb-5 ${
                isLight ? 'border-slate-300' : 'border-slate-800/80'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${isLight ? 'bg-amber-700' : 'bg-[#FBBF24]'}`} />
                  <h2 className={`text-2xl md:text-3xl font-extrabold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {isFr ? 'Architecture Stratégique DRC Nexus' : 'DRC Nexus Modular Structure'}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveNav('Pillars')}
                  className={`text-sm md:text-base font-extrabold flex items-center gap-2 transition-colors cursor-pointer ${
                    isLight ? 'text-amber-800 hover:text-amber-950' : 'text-[#FBBF24] hover:text-[#FDE68A]'
                  }`}
                >
                  <span>{isFr ? 'Consulter le cadre complet' : 'View Full Pillars Page'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Summary Card 1 */}
                <div className={`${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900'
                    : 'bg-[#131B2E]/90 hover:bg-[#18233D] border-slate-800/90 hover:border-slate-700/80 text-slate-100'
                } rounded-3xl border p-8 transition-all shadow-xl flex flex-col justify-between space-y-6 group`}>
                  <div className="space-y-4">
                    <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-wider block ${
                      isLight ? 'text-amber-900' : 'text-[#E5C188]'
                    }`}>
                      {isFr ? 'PILIER 1 • DIPLOMATIE BILATÉRALE' : 'PILLAR 1 • BILATERAL DIPLOMACY'}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-extrabold transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-amber-900' : 'text-white group-hover:text-[#FDE68A]'
                    }`}>
                      {isFr ? 'Cadre Institutionnel RDC–USA' : 'Policy & Regulatory Alignment'}
                    </h3>
                    <p className={`text-base leading-relaxed font-sans ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {isFr 
                        ? 'Accord bilatéral garantissant la conformité réglementaire, la sécurité juridique et le respect des normes ESG.'
                        : 'Bilateral U.S.-DRC strategic agreement ensuring regulatory compliance, mining rights, and ESG alignment.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveNav('Pillars')}
                    className={`text-sm font-extrabold transition-transform cursor-pointer pt-4 border-t text-left ${
                      isLight ? 'text-amber-800 hover:text-amber-950 border-slate-200' : 'text-[#FBBF24] border-slate-800/60'
                    }`}
                  >
                    <span>{isFr ? 'En savoir plus' : 'Learn More'}</span>
                  </button>
                </div>

                {/* Summary Card 2 */}
                <div className={`${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900'
                    : 'bg-[#131B2E]/90 hover:bg-[#18233D] border-slate-800/90 hover:border-slate-700/80 text-slate-100'
                } rounded-3xl border p-8 transition-all shadow-xl flex flex-col justify-between space-y-6 group`}>
                  <div className="space-y-4">
                    <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-wider block ${
                      isLight ? 'text-amber-900' : 'text-[#FBBF24]'
                    }`}>
                      {isFr ? 'PILIER 2 • EXTRACTION À FAIBLE COÛT' : 'PILLAR 2 • LOW-COST EXTRACTION'}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-extrabold transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-amber-900' : 'text-white group-hover:text-[#FDE68A]'
                    }`}>
                      {isFr ? 'Optimisation des Gisements' : 'Targeted Deposit Exploitation'}
                    </h3>
                    <p className={`text-base leading-relaxed font-sans ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {isFr
                        ? 'Exploitation ciblée des gisements sub-surfaciques assurant un coût opératoire réduit et une forte rentabilité.'
                        : 'Targeted exploitation of near-surface deposits guaranteeing significantly lower OPEX and high profit margins.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveNav('Pillars')}
                    className={`text-sm font-extrabold transition-transform cursor-pointer pt-4 border-t text-left ${
                      isLight ? 'text-amber-800 hover:text-amber-950 border-slate-200' : 'text-[#FBBF24] border-slate-800/60'
                    }`}
                  >
                    <span>{isFr ? 'En savoir plus' : 'Learn More'}</span>
                  </button>
                </div>

                {/* Summary Card 3 */}
                <div className={`${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900'
                    : 'bg-[#131B2E]/90 hover:bg-[#18233D] border-slate-800/90 hover:border-slate-700/80 text-slate-100'
                } rounded-3xl border p-8 transition-all shadow-xl flex flex-col justify-between space-y-6 group`}>
                  <div className="space-y-4">
                    <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-wider block ${
                      isLight ? 'text-amber-900' : 'text-[#FBBF24]'
                    }`}>
                      {isFr ? 'PILIER 3 • INDUSTRIALISATION COOPÉRATIVE' : 'PILLAR 3 • COOPERATIVE INDUSTRIALIZATION'}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-extrabold transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-amber-900' : 'text-white group-hover:text-[#FDE68A]'
                    }`}>
                      {isFr ? 'Transformation et Traçabilité' : 'Local Refining & Traceability'}
                    </h3>
                    <p className={`text-base leading-relaxed font-sans ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {isFr
                        ? 'Structuration des coopératives, première transformation locale et traçabilité numérique de la mine au marché.'
                        : 'Structuring mining cooperatives, local refining, and rigorous digital supply chain traceability.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveNav('Pillars')}
                    className={`text-sm font-extrabold transition-transform cursor-pointer pt-4 border-t text-left ${
                      isLight ? 'text-amber-800 hover:text-amber-950 border-slate-200' : 'text-[#FBBF24] border-slate-800/60'
                    }`}
                  >
                    <span>{isFr ? 'En savoir plus' : 'Learn More'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Legacy & Vision Section: Bridging Continents */}
            <div 
              className={`rounded-3xl border p-8 sm:p-12 relative overflow-hidden my-6 shadow-xl transition-all ${
                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#131B2E]/90 border-slate-800/90 text-slate-100'
              }`}
            >
              <div className="max-w-4xl space-y-8 relative z-10">
                <div className="flex items-center gap-3">
                  <span className={`inline-block w-3 h-3 rounded-full ${isLight ? 'bg-amber-700' : 'bg-[#C8A97E]'}`} />
                  <span className={`text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>
                    {isFr ? 'Perspective Historique & Vision' : 'Legacy & Vision'}
                  </span>
                </div>

                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isFr ? (
                    <>
                      Souveraineté Industrielle et{' '}
                      <span className={isLight ? 'text-amber-800 font-black' : 'text-[#FBBF24]'}>Partenariat Stratégique</span>.
                    </>
                  ) : (
                    <>
                      Bridging Continents,{' '}
                      <span className={isLight ? 'text-amber-800 font-black' : 'text-[#FBBF24]'}>Securing Resources</span>.
                    </>
                  )}
                </h2>

                <div className={`space-y-5 text-base sm:text-lg md:text-xl leading-relaxed font-sans ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <p>
                    {isFr
                      ? "Depuis plus d'un siècle, la République Démocratique du Congo constitue un pilier silencieux de l'industrialisation mondiale et de l'innovation technologique — de la fourniture de matériaux essentiels lors de la Révolution industrielle au Projet Manhattan et à l'émergence des télécommunications."
                      : "For over a century, the Democratic Republic of Congo has quietly powered global industrialization and technological progress—from supplying rubber during the rise of the automobile industry, to fueling the Manhattan Project, to enabling the mobile phone revolution."}
                  </p>
                  <p>
                    {isFr
                      ? "Riche de gisements estimés à plus de 24 000 milliards de dollars — comprenant cobalt, cuivre, tantale, lithium et terres rares —, la RDC s'impose aujourd'hui au centre de la transition énergétique, de l'électromobilité et de l'industrie des semi-conducteurs."
                      : "Today, with its vast reserves of strategic minerals—including cobalt, copper, tantalum, lithium, and rare earth elements valued at over $24 trillion—Congo stands at the heart of the clean energy transition, electric vehicles, and now the future of artificial intelligence."}
                  </p>
                </div>

                <div className="pt-6 flex flex-wrap items-center gap-5">
                  <button
                    onClick={() => setActiveNav('Pillars')}
                    className={`px-8 py-4 rounded-full text-sm md:text-base font-extrabold transition-all shadow-md active:scale-95 cursor-pointer border ${
                      isLight
                        ? 'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] hover:from-[#1E40AF] hover:to-[#2563EB] text-white border-blue-400/40 shadow-blue-600/20'
                        : 'bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white border-blue-400/20'
                    }`}
                  >
                    <span>{isFr ? 'Consulter nos Piliers' : 'Explore Core Pillars'}</span>
                  </button>
                  <button
                    onClick={() => setActiveNav('Partners')}
                    className={`px-8 py-4 rounded-full text-sm md:text-base font-extrabold transition-all border active:scale-95 cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        : 'bg-[#131B2E] hover:bg-slate-800 text-slate-200 border-slate-700/80'
                    }`}
                  >
                    <span>{isFr ? 'Écosystème Partenaire' : 'Our Strategic Partners'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Core Pillars View */}
        {activeNav === 'Pillars' && (
          <div className="max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10 animate-in fade-in duration-300">
            {/* Page Header */}
            <div className={`rounded-3xl border p-8 md:p-12 space-y-4 shadow-xl ${
              isLight ? 'bg-white border-slate-300 shadow-xl' : 'bg-[#131B2E]/90 border-slate-800/90 shadow-2xl'
            }`}>
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${isLight ? 'bg-amber-700' : 'bg-[#FBBF24]'}`} />
                <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-widest ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>
                  {isFr ? 'CADRE STRATÉGIQUE' : 'STRATEGIC FRAMEWORK'}
                </span>
              </div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isFr ? 'Les Piliers Fondamentaux de DRC Nexus' : 'The Core Pillars of DRC Nexus'}
              </h1>
              <p className={`text-lg md:text-xl max-w-4xl leading-relaxed italic font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                "{isFr 
                  ? 'Un modèle intégré alliant diplomatie bilatérale, extraction compétitive et industrialisation coopérative.'
                  : 'An integrated execution model bridging bilateral diplomacy, low-cost extraction, and cooperative industrialization.'}"
              </p>
            </div>

            {/* Deep-Dive Interactive Pillar Detail Selector */}
            <div className={`rounded-3xl border overflow-hidden flex flex-col shadow-xl transition-colors duration-300 ${
              isLight
                ? 'bg-white border-slate-300 text-slate-800'
                : 'bg-[#131B2E]/90 border-slate-800/90 text-slate-100 shadow-2xl'
            }`}>
              <div className={`p-8 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                isLight ? 'bg-slate-100/90 border-slate-200' : 'bg-[#0E1424] border-slate-800/80'
              }`}>
                <div>
                  <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-widest block ${
                    isLight ? 'text-amber-900' : 'text-[#E5C188]'
                  }`}>
                    {isFr ? 'ANALYSE DÉTAILLÉE' : 'DEEP-DIVE ANALYSIS'}
                  </span>
                  <h3 className={`text-xl md:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {isFr ? 'Explorez les détails de chaque composante' : 'Explore Operational Components'}
                  </h3>
                </div>

                {/* Tab Switcher */}
                <div className={`flex p-1.5 rounded-2xl border ${
                  isLight ? 'bg-slate-200/90 border-slate-300' : 'bg-[#080B12] border-slate-800'
                }`}>
                  {(['MANDATE', 'MODEL', 'ENGINE'] as FeedTab[]).map((tab) => {
                    const tabLabels: Record<FeedTab, { en: string; fr: string }> = {
                      MANDATE: { en: 'Mandate', fr: 'Mandat' },
                      MODEL: { en: 'Model', fr: 'Modèle' },
                      ENGINE: { en: 'Engine', fr: 'Moteur' }
                    };
                    const isActive = activeFeedTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveFeedTab(tab)}
                        className={`px-6 py-3 text-sm md:text-base font-extrabold rounded-xl transition-all cursor-pointer ${
                          isActive
                            ? isLight
                              ? 'text-amber-950 bg-white border border-amber-400 shadow-sm'
                              : 'text-[#FBBF24] bg-[#18233D] border border-[#FBBF24]/40 shadow-sm'
                            : isLight
                              ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                              : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {tabLabels[tab][isFr ? 'fr' : 'en']}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Tab Panel */}
              <div className={`p-8 md:p-12 space-y-8 ${
                isLight ? 'bg-white' : 'bg-gradient-to-b from-[#131B2E] to-[#0E1424]'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`text-xs md:text-sm font-mono font-extrabold px-4 py-1.5 rounded-md border uppercase tracking-widest ${
                    isLight ? 'text-amber-950 bg-amber-100/90 border-amber-300' : 'text-[#E5C188] bg-[#C8A97E]/10 border-[#C8A97E]/30'
                  }`}>
                    {isFr ? HOME_TABS_CONTENT[activeFeedTab].badgeFr : HOME_TABS_CONTENT[activeFeedTab].badgeEn}
                  </span>
                </div>

                <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isFr ? HOME_TABS_CONTENT[activeFeedTab].titleFr : HOME_TABS_CONTENT[activeFeedTab].titleEn}
                </h3>

                <p className={`text-base md:text-lg lg:text-xl leading-relaxed font-sans max-w-5xl ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {isFr ? HOME_TABS_CONTENT[activeFeedTab].textFr : HOME_TABS_CONTENT[activeFeedTab].textEn}
                </p>

                <div className={`pt-6 flex items-center justify-between border-t text-sm font-mono font-bold ${
                  isLight ? 'border-slate-200 text-slate-700' : 'border-slate-800/80 text-slate-400'
                }`}>
                  <span>DRC NEXUS • STRATEGIC PILLAR: {activeFeedTab}</span>
                </div>
              </div>
            </div>

            {/* Institutional Framework Highlight Box */}
            <div className={`rounded-3xl border p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl transition-colors duration-300 ${
              isLight
                ? 'bg-slate-100/95 border-slate-300 text-slate-900'
                : 'bg-[#131B2E]/90 border-slate-800/90 text-slate-100'
            }`}>
              <div className="space-y-3 max-w-3xl">
                <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-widest block ${
                  isLight ? 'text-amber-900' : 'text-[#FBBF24]'
                }`}>
                  {isFr ? 'CADRE INSTITUTIONNEL' : 'INSTITUTIONAL FRAMEWORK'}
                </span>
                <h3 className={`text-2xl md:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isFr ? 'Corridor Minier Stratégique RDC–États-Unis' : 'DRC - United States Strategic Minerals Corridor'}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed font-sans ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {isFr
                    ? 'Mécanisme tripartite réunissant la RDC, les États-Unis et les acteurs industriels majeurs afin d\'assurer la traçabilité, le respect des normes ESG et la première transformation des métaux critiques.'
                    : 'A tripartite mechanism bridging the DRC, United States, and strategic industrial partners to ensure full traceability, ESG compliance, and local refining of critical metals.'}
                </p>
              </div>

              <button
                onClick={() => setActiveNav('Contact')}
                className={`px-8 py-4 rounded-full text-sm md:text-base font-extrabold transition-all shadow-lg shrink-0 border cursor-pointer ${
                  isLight
                    ? 'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] hover:from-[#1E40AF] hover:to-[#2563EB] text-white border-blue-400/40 shadow-blue-600/20'
                    : 'bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white border-blue-400/20'
                }`}
              >
                <span>{isFr ? 'Initiation de Partenariat' : 'Partnership Inquiry'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Live Market Price Tracking Page View */}
        {activeNav === 'Markets' && (
          <div className="max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10 animate-in fade-in duration-300">
            {/* Header Title Section */}
            <div className={`rounded-3xl border p-8 md:p-12 relative overflow-hidden shadow-xl space-y-6 transition-colors duration-300 ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900'
                : 'bg-[#131B2E]/90 border-slate-800/90 text-slate-100 shadow-2xl'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-widest ${
                      isLight ? 'text-amber-900' : 'text-[#FBBF24]'
                    }`}>
                      {isFr ? 'SUIVI EN DIRECT • RDC & MARCHÉS MONDIAUX' : 'LIVE FEED • DRC & GLOBAL MARKETS'}
                    </span>
                  </div>
                  <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {isFr ? 'Minéraux Stratégiques de la RDC' : 'DRC Strategic Minerals'}
                  </h1>
                  <p className={`text-base md:text-lg mt-3 max-w-4xl leading-relaxed ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    {isFr
                      ? 'Suivi de la performance des minéraux stratégiques de la RDC sur les marchés internationaux et des dynamiques des métaux critiques.'
                      : 'Tracking the performance of DRC strategic minerals on international markets and critical metal dynamics.'}
                  </p>
                </div>

                <div className={`p-5 rounded-2xl shrink-0 space-y-2 font-mono text-xs md:text-sm border ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-[#0E1424] border-slate-800 text-slate-300'
                }`}>
                  <div className={`flex items-center justify-between gap-8 ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-400'}`}>
                    <span>{isFr ? 'LME & Fastmarkets' : 'LME & Fastmarkets'}</span>
                    <span className={`font-black ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>{isFr ? 'ACTIF' : 'ACTIVE'}</span>
                  </div>
                  <div className={`font-extrabold ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    {isFr ? 'Valeur des Réserves RDC :' : 'DRC Reserve Valuation:'} <span className={isLight ? 'text-amber-900 font-black' : 'text-[#FBBF24]'}>$24T+</span>
                  </div>
                  <div className={`text-xs ${isLight ? 'text-slate-700 font-semibold' : 'text-slate-500'}`}>
                    {isFr ? 'Dernière mise à jour : En direct' : 'Last Updated: Live Sync'}
                  </div>
                </div>
              </div>

              {/* Quick Market Stats Cards */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t ${
                isLight ? 'border-slate-200' : 'border-slate-800/80'
              }`}>
                <div className={`p-4 rounded-2xl border ${
                  isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#0E1424]/90 border-slate-800'
                }`}>
                  <span className={`text-xs uppercase font-mono block mb-1 ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-400'}`}>
                    {isFr ? 'Part du Cobalt' : 'Cobalt Global Share'}
                  </span>
                  <span className={`text-2xl md:text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>70%</span>
                  <span className={`text-xs block font-sans font-extrabold mt-1 ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>
                    {isFr ? '1er Producteur Mondial' : '#1 Global Producer'}
                  </span>
                </div>
                <div className={`p-4 rounded-2xl border ${
                  isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#0E1424]/90 border-slate-800'
                }`}>
                  <span className={`text-xs uppercase font-mono block mb-1 ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-400'}`}>
                    {isFr ? 'Réserves de Coltan' : 'Coltan Global Reserve'}
                  </span>
                  <span className={`text-2xl md:text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>40%</span>
                  <span className={`text-xs block font-sans font-extrabold mt-1 ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>
                    {isFr ? 'Ressource Stratégique 3T' : '3T Strategic Supply'}
                  </span>
                </div>
                <div className={`p-4 rounded-2xl border ${
                  isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#0E1424]/90 border-slate-800'
                }`}>
                  <span className={`text-xs uppercase font-mono block mb-1 ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-400'}`}>
                    {isFr ? 'Production de Cuivre' : 'Copper Production'}
                  </span>
                  <span className={`text-2xl md:text-3xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>#2</span>
                  <span className={`text-xs block font-sans font-extrabold mt-1 ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>
                    {isFr ? 'Rang Mondial RDC' : 'Global World Ranking'}
                  </span>
                </div>
                <div className={`p-4 rounded-2xl border ${
                  isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#0E1424]/90 border-slate-800'
                }`}>
                  <span className={`text-xs uppercase font-mono block mb-1 ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-400'}`}>
                    {isFr ? 'Conformité Traçabilité' : 'Traceability Assurance'}
                  </span>
                  <span className={`text-2xl md:text-3xl font-black font-mono ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>100%</span>
                  <span className={`text-xs block font-sans font-extrabold mt-1 ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>
                    {isFr ? 'Garantie Minéraux Propres' : 'Conflict-Free Guaranteed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls Bar: Category Selector & Live Search */}
            <div className={`flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-3xl border shadow-md transition-colors duration-300 ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#131B2E]/90 border-slate-800/90 text-slate-100'
            }`}>
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <span className={`text-sm font-extrabold uppercase tracking-wider hidden lg:inline mr-2 ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}>
                  {isFr ? 'Catégorie :' : 'Category:'}
                </span>
                {[
                  { id: 'ALL', labelEn: 'All Minerals', labelFr: 'Tous les Minéraux' },
                  { id: 'BATTERY', labelEn: 'Battery & EV Metals', labelFr: 'Métaux de Batteries' },
                  { id: '3T', labelEn: '3T Critical Metals', labelFr: 'Métaux Critiques 3T' },
                  { id: 'SEMICONDUCTOR', labelEn: 'Tech & Optics', labelFr: 'Optique & Technologie' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedMarketCategory(cat.id as any)}
                    className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                      selectedMarketCategory === cat.id
                        ? isLight
                          ? 'bg-amber-100 text-amber-950 border border-amber-300 shadow-sm'
                          : 'bg-[#18233D] text-[#FBBF24] border border-[#FBBF24]/50 shadow-md'
                        : isLight
                          ? 'bg-slate-100 text-slate-800 hover:text-slate-900 border border-slate-300 hover:bg-slate-200'
                          : 'bg-[#0E1424] text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {isFr ? cat.labelFr : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative w-full md:w-80 shrink-0">
                <input
                  type="text"
                  value={marketSearch}
                  onChange={(e) => setMarketSearch(e.target.value)}
                  placeholder={isFr ? "Rechercher par nom ou symbole (ex: Co, Cu)..." : "Search by name or symbol (e.g. Co, Cu)..."}
                  className={`w-full rounded-2xl px-5 py-3 text-xs md:text-sm font-medium focus:outline-none transition-colors ${
                    isLight
                      ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 focus:border-amber-600'
                      : 'bg-[#0E1424] border border-slate-700/80 text-slate-100 placeholder-slate-400 focus:border-[#FBBF24]'
                  }`}
                />
                {marketSearch && (
                  <button
                    onClick={() => setMarketSearch('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic Market Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DRC_MINERAL_MARKET_INDEX
                .filter((mineral) => {
                  const matchesCategory = selectedMarketCategory === 'ALL' || mineral.category === selectedMarketCategory;
                  const q = marketSearch.toLowerCase();
                  const matchesSearch =
                    mineral.symbol.toLowerCase().includes(q) ||
                    mineral.nameEn.toLowerCase().includes(q) ||
                    mineral.nameFr.toLowerCase().includes(q);
                  return matchesCategory && matchesSearch;
                })
                .map((mineral, index) => (
                  <div
                    key={index}
                    className={`rounded-3xl p-6 transition-all shadow-xl flex flex-col justify-between gap-6 group border ${
                      isLight
                        ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900'
                        : 'bg-[#131B2E]/90 hover:bg-[#18233D] border-slate-800/90 hover:border-slate-700/80 text-slate-100'
                    }`}
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-mono text-base font-black shadow-inner transition-transform ${
                          isLight
                            ? 'bg-amber-100/90 border-amber-300 text-amber-900'
                            : 'bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-slate-700 text-[#FBBF24]'
                        }`}>
                          {mineral.symbol}
                        </div>
                        <span className={`text-xs md:text-sm font-mono font-extrabold px-3 py-1.5 rounded-lg border ${
                          mineral.isPositive
                            ? isLight
                              ? 'text-teal-900 bg-teal-100 border-teal-300'
                              : 'text-teal-300 bg-teal-950/50 border-teal-700/60'
                            : isLight
                              ? 'text-rose-900 bg-rose-100 border-rose-300'
                              : 'text-rose-300 bg-rose-950/50 border-rose-700/60'
                        }`}>
                          {mineral.change}
                        </span>
                      </div>

                      {/* Name & DRC Share */}
                      <h3 className={`text-xl font-black transition-colors ${
                        isLight ? 'text-slate-900 group-hover:text-amber-900' : 'text-white group-hover:text-[#FDE68A]'
                      }`}>
                        {isFr ? mineral.nameFr : mineral.nameEn}
                      </h3>
                      <span className={`text-xs md:text-sm font-extrabold block mt-1 ${
                        isLight ? 'text-amber-900' : 'text-[#E5C188]'
                      }`}>
                        {isFr ? mineral.drcShareFr : mineral.drcShareEn}
                      </span>

                      {/* Benchmark Source */}
                      <p className={`text-xs font-mono mt-3 px-3 py-1.5 rounded-lg border truncate font-medium ${
                        isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-[#0E1424] border-slate-800 text-slate-300'
                      }`}>
                        {isFr ? mineral.benchmarkFr : mineral.benchmarkEn}
                      </p>

                      {/* Industrial Applications */}
                      <div className="mt-4 space-y-1">
                        <span className={`text-xs uppercase tracking-widest block font-mono font-extrabold ${
                          isLight ? 'text-slate-800' : 'text-slate-400'
                        }`}>
                          {isFr ? 'Applications Industrielles :' : 'Key Applications:'}
                        </span>
                        <p className={`text-sm leading-snug font-medium ${
                          isLight ? 'text-slate-800' : 'text-slate-300'
                        }`}>
                          {isFr ? mineral.appUseFr : mineral.appUseEn}
                        </p>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className={`pt-4 border-t space-y-4 ${
                      isLight ? 'border-slate-200' : 'border-slate-800/80'
                    }`}>
                      <div className="flex items-baseline justify-between">
                        <span className={`text-2xl font-black font-mono tracking-tight ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}>{mineral.price}</span>
                        <span className={`text-xs md:text-sm font-mono font-bold ${
                          isLight ? 'text-slate-700' : 'text-slate-400'
                        }`}>/{mineral.unit}</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedMineral(mineral.nameEn.toLowerCase());
                          setActiveNav('Contact');
                        }}
                        className={`w-full py-3 rounded-full text-xs md:text-sm font-extrabold transition-all border cursor-pointer flex items-center justify-center shadow-md uppercase tracking-wider ${
                          isLight
                            ? 'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] hover:from-[#1E40AF] hover:to-[#2563EB] text-white border-blue-400/40 shadow-blue-600/20'
                            : 'bg-[#18233D] hover:bg-[#2563EB] text-slate-200 hover:text-white border-slate-700 hover:border-blue-400'
                        }`}
                      >
                        <span>{isFr ? 'Demander un Contrat d\'Offtake' : 'Inquire Offtake Contract'}</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Team View */}
        {activeNav === 'Team' && (
          <div className="max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10 animate-in fade-in duration-300">
            <div className={`${
              isLight ? 'bg-white border-slate-300 shadow-xl' : 'bg-[#131B2E]/90 border-slate-800/90 shadow-2xl'
            } rounded-3xl border p-8 md:p-12 space-y-4`}>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-widest ${
                  isLight ? 'text-amber-900' : 'text-[#E5C188]'
                }`}>
                  {isFr ? 'ÉQUIPE DE DIRECTION DRC NEXUS' : 'DRC NEXUS LEADERSHIP TEAM'}
                </span>
              </div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isFr ? 'Une Plateforme d’Exécution Intégrée' : 'A Team Built for Execution.'}
              </h1>
              <p className={`text-base md:text-lg max-w-4xl leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {isFr
                  ? 'DRC Nexus réunit des experts et leaders industriels couvrant toute la chaîne de valeur des minerais — de l’exploration à l’énergie, de la logistique à la transformation et au financement. Notre approche intégrée combine expertise opérationnelle et partenariats stratégiques pour déployer des solutions minières responsables, de la ressource au marché.'
                  : 'From exploration to energy, logistics to finance—DRC Nexus unites industry leaders with proven expertise to deliver a turnkey, responsible mineral development solution, end to end.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {LEADERSHIP_PARTNERS.map((partner) => {
                const isExpanded = expandedTeamCard === partner.id;
                return (
                  <div 
                    key={partner.id} 
                    onClick={() => setExpandedTeamCard(isExpanded ? null : partner.id)}
                    className={`${
                      isLight
                        ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900 shadow-xl'
                        : 'bg-[#131B2E]/90 hover:bg-[#18233D] border-slate-800/90 hover:border-slate-700/80 text-slate-100 shadow-xl'
                    } p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 group`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs md:text-sm font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-md border ${
                          isLight
                            ? 'text-amber-900 bg-amber-100 border-amber-300'
                            : 'text-[#E5C188] bg-[#C8A97E]/10 border-[#C8A97E]/30'
                        }`}>
                          {isFr ? partner.categoryFr : partner.categoryEn}
                        </span>
                        <span className={`text-xs md:text-sm px-3.5 py-1.5 rounded-md border font-mono font-bold ${
                          isLight
                            ? 'text-blue-900 bg-blue-100 border-blue-300'
                            : 'text-blue-300 bg-blue-500/10 border-blue-500/30'
                        }`}>
                          {isExpanded ? (isFr ? 'Masquer [-]' : 'Hide Details [-]') : (isFr ? 'Voir les détails [+]' : 'View Details [+]')}
                        </span>
                      </div>

                      <h3 className={`text-xl md:text-2xl font-black transition-colors mt-2 ${
                        isLight ? 'text-slate-900 group-hover:text-amber-900' : 'text-white group-hover:text-[#E5C188]'
                      }`}>
                        {isFr ? partner.partnerFr : partner.partnerEn}
                      </h3>

                      {(partner.leadEn || partner.leadFr) && (
                        <p className={`text-base font-extrabold mt-2 ${
                          isLight ? 'text-amber-900' : 'text-[#E5C188]'
                        }`}>
                          {isFr ? partner.leadFr : partner.leadEn}
                        </p>
                      )}
                    </div>

                    {isExpanded && (
                      <div className={`pt-4 border-t text-base md:text-lg leading-relaxed p-6 rounded-2xl border shadow-inner ${
                        isLight
                          ? 'bg-slate-100 border-slate-300 text-slate-900'
                          : 'bg-[#0E1424]/80 border-slate-700/60 text-slate-200'
                      }`}>
                        {isFr ? partner.descriptionFr : partner.descriptionEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Our Core Values Section */}
            <div className={`pt-12 border-t space-y-8 ${isLight ? 'border-slate-300' : 'border-slate-800'}`}>
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {isFr ? 'Nos Valeurs Fondamentales' : 'Our Core Values'}
                </h2>
                <p className={`text-base md:text-lg ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {isFr
                    ? 'Ces principes guident chaque aspect de nos opérations et de nos partenariats.'
                    : 'These principles guide every aspect of our operations and partnerships.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CORE_VALUES.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900 shadow-xl'
                          : 'bg-[#131B2E]/90 hover:bg-[#18233D] border-slate-800/90 hover:border-slate-700/80 text-slate-100 shadow-xl'
                      } rounded-3xl border p-8 flex flex-col items-center text-center space-y-4 transition-all group`}
                    >
                      <h3 className={`text-xl font-extrabold transition-colors ${
                        isLight ? 'text-slate-900 group-hover:text-amber-900' : 'text-white group-hover:text-[#FDE68A]'
                      }`}>
                        {isFr ? value.titleFr : value.titleEn}
                      </h3>
                      <p className={`text-base leading-relaxed font-sans ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        {isFr ? value.descFr : value.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Partners View */}
        {activeNav === 'Partners' && (
          <div className="max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10 animate-in fade-in duration-300">
            <div className={`${
              isLight ? 'bg-white border-slate-300 shadow-xl' : 'bg-[#131B2E]/90 border-slate-800/90 shadow-2xl'
            } rounded-3xl border p-8 md:p-12 space-y-4`}>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-widest ${
                  isLight ? 'text-amber-900' : 'text-[#E5C188]'
                }`}>
                  {isFr ? 'RÉSEAU ET PARTENARIATS INSTITUTIONNELS' : 'STRATEGIC NETWORK & PARTNERS'}
                </span>
              </div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isFr ? 'Nos Partenaires Stratégiques' : 'Our Trusted Partners'}
              </h1>
              <p className={`text-base md:text-lg max-w-4xl leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {isFr
                  ? 'Une alliance d’acteurs engagés pour sécuriser les chaînes d’approvisionnement en minéraux stratégiques de la RDC.'
                  : 'A synergy of public, private, and industrial leaders united to secure the critical minerals supply chain from the DRC to allied markets.'}
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex justify-center pt-2">
              <div className={`${
                isLight ? 'bg-slate-200/80 border-slate-300 shadow-md' : 'bg-[#0E1424] border-slate-800/90 shadow-2xl'
              } border p-2 rounded-2xl inline-flex flex-wrap justify-center gap-2`}>
                {PARTNER_CATEGORIES.map((cat) => {
                  const isActive = selectedPartnerCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedPartnerCategory(cat.id)}
                      className={`px-6 py-3 rounded-xl text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                        isActive
                          ? isLight
                            ? 'bg-white text-amber-900 border border-amber-400 shadow-sm'
                            : 'bg-[#18233D] text-[#FBBF24] border border-[#FBBF24]/60 shadow-lg'
                          : isLight
                            ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      {isFr ? cat.titleFr : cat.titleEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Subtitle Description */}
            {(() => {
              const currentCat = PARTNER_CATEGORIES.find(c => c.id === selectedPartnerCategory) || PARTNER_CATEGORIES[0];
              return (
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <p className={`text-base md:text-lg font-bold leading-relaxed ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    {isFr ? currentCat.subtitleFr : currentCat.subtitleEn}
                  </p>
                </div>
              );
            })()}

            {/* Grid of Cards */}
            {(() => {
              const currentCat = PARTNER_CATEGORIES.find(c => c.id === selectedPartnerCategory) || PARTNER_CATEGORIES[0];
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentCat.partners.map((partner, index) => {
                    return (
                      <div
                        key={index}
                        className={`${
                          isLight
                            ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400 text-slate-900 shadow-xl'
                            : 'bg-[#131B2E]/90 hover:bg-[#18233D] border-slate-800/90 hover:border-slate-700/80 text-slate-100 shadow-xl'
                        } rounded-3xl border p-8 flex flex-col items-center text-center space-y-5 transition-all group`}
                      >
                        <h3 className={`text-xl font-extrabold transition-colors ${
                          isLight ? 'text-slate-900 group-hover:text-amber-900' : 'text-white group-hover:text-[#FDE68A]'
                        }`}>
                          {isFr ? partner.nameFr : partner.nameEn}
                        </h3>
                        <p className={`text-base leading-relaxed font-sans ${
                          isLight ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {isFr ? partner.descFr : partner.descEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Strategic Alliance Callout Box */}
            <div className={`${
              isLight ? 'bg-white border-slate-300 shadow-xl' : 'bg-[#131B2E]/90 border-slate-800/90 shadow-2xl'
            } rounded-3xl border p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8`}>
              <div className="space-y-4 max-w-3xl">
                <div>
                  <span className={`inline-block text-xs md:text-sm font-mono font-extrabold px-4 py-1.5 rounded border uppercase tracking-widest mb-3 ${
                    isLight
                      ? 'text-amber-900 bg-amber-100 border-amber-300'
                      : 'text-[#FBBF24] bg-amber-500/10 border-amber-500/30'
                  }`}>
                    {isFr ? 'EXTENSION DU RÉSEAU' : 'ALLIANCE EXPANSION'}
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-extrabold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {isFr ? 'Rejoindre l\'Écosystème Partenaire DRC Nexus' : 'Join the DRC Nexus Strategic Alliance'}
                  </h3>
                </div>
                <p className={`text-base md:text-lg leading-relaxed font-sans ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {isFr
                    ? 'Nous invitons les raffineurs certifiés, les opérateurs logistiques de premier plan et les entités financières institutionnelles à intégrer notre corridor d\'approvisionnement sécurisé.'
                    : 'We invite qualified refiners, tier-1 logistics operators, and institutional finance partners to join our secure supply chain corridor.'}
                </p>
              </div>

              <button
                onClick={() => setActiveNav('Contact')}
                className={`px-8 py-4 rounded-full text-sm md:text-base font-extrabold transition-all shadow-lg shrink-0 border cursor-pointer ${
                  isLight
                    ? 'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] hover:from-[#1E40AF] hover:to-[#2563EB] text-white border-blue-400/40 shadow-blue-600/20'
                    : 'bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white border-blue-400/20'
                }`}
              >
                <span>{isFr ? 'Proposer une Collaboration' : 'Submit Alliance Proposal'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Contact View */}
        {activeNav === 'Contact' && (
          <div className="max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10 animate-in fade-in duration-300">
            <div className={`${
              isLight ? 'bg-white border-slate-300 shadow-xl' : 'bg-[#131B2E]/90 border-slate-800/90 shadow-2xl'
            } rounded-3xl border p-8 md:p-12 space-y-4`}>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                <span className={`text-xs md:text-sm font-mono font-extrabold uppercase tracking-widest ${
                  isLight ? 'text-amber-900' : 'text-[#E5C188]'
                }`}>
                  {isFr ? 'RELATIONS INSTITUTIONNELLES ET STRATÉGIQUES' : 'STRATEGIC AFFAIRS & INQUIRIES'}
                </span>
              </div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isFr ? 'Secrétariat Stratégique' : 'Contact Us'}
              </h1>
              <p className={`text-base md:text-lg max-w-4xl leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {isFr
                  ? 'Canaux de coordination directes pour les industriels américains, les représentants gouvernementaux et les partenaires institutionnels.'
                  : 'Establishing direct coordination channels for U.S. end-users, government representatives, and institutional partners.'}
              </p>
            </div>

            <div className={`max-w-4xl mx-auto w-full rounded-3xl border p-8 md:p-12 space-y-8 shadow-2xl ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#131B2E]/90 border-slate-800/90 text-slate-100'
            }`}>
              <div className={`border-b pb-6 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <h3 className={`text-2xl font-extrabold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  <span>{isFr ? 'Demande de renseignements' : 'Strategic Inquiry Form'}</span>
                </h3>
              </div>

              {isContactSubmitted ? (
                <div className={`rounded-2xl p-8 text-center space-y-4 animate-in fade-in duration-300 border ${
                  isLight ? 'bg-amber-50/90 border-amber-300' : 'bg-amber-950/40 border-amber-500/40'
                }`}>
                  <h4 className={`text-xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {isFr ? 'Demande préparée pour info@drcnexus.com' : 'Inquiry prepared for info@drcnexus.com'}
                  </h4>
                  <p className={`text-base max-w-lg mx-auto leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {isFr
                      ? 'Votre client de messagerie a été ouvert avec les détails de votre message adressé à info@drcnexus.com.'
                      : 'Your email client has been launched with your inquiry details addressed to info@drcnexus.com.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsContactSubmitted(false);
                      setContactName('');
                      setContactOrg('');
                      setContactEmail('');
                      setContactSubject('');
                      setContactMessage('');
                    }}
                    className={`mt-3 px-6 py-3 rounded-xl text-sm font-extrabold transition-all border cursor-pointer ${
                      isLight
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                        : 'bg-[#18233D] hover:bg-slate-800 text-[#FBBF24] border-slate-700'
                    }`}
                  >
                    {isFr ? 'Envoyer une autre demande' : 'Send another inquiry'}
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const mineralSelected = selectedMineral === 'other' ? (customMineral || 'Other') : selectedMineral;
                    const subj = encodeURIComponent(contactSubject || (isFr ? "Demande d'information - DRC Nexus" : "Strategic Inquiry - DRC Nexus"));
                    const body = encodeURIComponent(
                      `${isFr ? "Nom complet" : "Full Name"}: ${contactName}\n` +
                      `${isFr ? "Organisation" : "Organization"}: ${contactOrg}\n` +
                      `${isFr ? "Email" : "Email"}: ${contactEmail}\n` +
                      `${isFr ? "Minéral d'intérêt" : "Mineral Interest"}: ${mineralSelected}\n\n` +
                      `${isFr ? "Message" : "Message"}:\n${contactMessage}`
                    );
                    window.location.href = `mailto:info@drcnexus.com?subject=${subj}&body=${body}`;
                    setIsContactSubmitted(true);
                  }} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-extrabold mb-2 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                        {isFr ? 'Nom Complet' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-medium ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                            : 'bg-[#0E1424] border-slate-700/80 text-slate-100 placeholder-slate-500'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-extrabold mb-2 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                        {isFr ? 'Organisation / Entreprise' : 'Organization / Enterprise'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactOrg}
                        onChange={(e) => setContactOrg(e.target.value)}
                        placeholder="U.S. Strategic Minerals Corp"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-medium ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                            : 'bg-[#0E1424] border-slate-700/80 text-slate-100 placeholder-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-extrabold mb-2 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                        {isFr ? 'Adresse Email' : 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="contact@enterprise.com"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-medium ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                            : 'bg-[#0E1424] border-slate-700/80 text-slate-100 placeholder-slate-500'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-extrabold mb-2 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                        {isFr ? 'Minéral d\'Intérêt' : 'Strategic Mineral Interest'}
                      </label>
                      <select
                        value={selectedMineral}
                        onChange={(e) => setSelectedMineral(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-medium ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900'
                            : 'bg-[#0E1424] border-slate-700/80 text-slate-100'
                        }`}
                      >
                        <option value="cobalt">Cobalt</option>
                        <option value="copper">{isFr ? 'Cuivre' : 'Copper'}</option>
                        <option value="tantalum">{isFr ? 'Tantale' : 'Tantalum'}</option>
                        <option value="lithium">Lithium</option>
                        <option value="germanium">Germanium</option>
                        <option value="tungsten">{isFr ? 'Tungstène' : 'Tungsten'}</option>
                        <option value="rare-earths">{isFr ? 'Terres Rares' : 'Rare Earths'}</option>
                        <option value="other">{isFr ? 'Autre (Préciser)' : 'Other (Specify)'}</option>
                      </select>

                      {selectedMineral === 'other' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            required
                            value={customMineral}
                            onChange={(e) => setCustomMineral(e.target.value)}
                            placeholder={isFr ? "Entrez le nom du minéral..." : "Enter mineral name..."}
                            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-medium ${
                              isLight
                                ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                                : 'bg-[#0E1424] border-slate-700/80 text-slate-100 placeholder-slate-500'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-extrabold mb-2 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      {isFr ? 'Sujet' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder={isFr ? "Demande d'accord d'enlèvement de la chaîne d'approvisionnement U.S." : "U.S. Supply Chain Offtake Agreement Inquiry"}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-medium ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                          : 'bg-[#0E1424] border-slate-700/80 text-slate-100 placeholder-slate-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-extrabold mb-2 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      {isFr ? 'Message' : 'Message'} *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={isFr ? "Décrivez vos exigences stratégiques, les volumes requis ou le cadre de collaboration..." : "Describe your strategic requirements, required volumes, or collaboration framework..."}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-medium ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                          : 'bg-[#0E1424] border-slate-700/80 text-slate-100 placeholder-slate-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 rounded-full text-sm md:text-base font-extrabold transition-all shadow-lg cursor-pointer uppercase tracking-wider border flex items-center justify-center gap-2 ${
                      isLight
                        ? 'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] hover:from-[#1E40AF] hover:to-[#2563EB] text-white border-blue-400/40 shadow-blue-600/20'
                        : 'bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white border-blue-400/20'
                    }`}
                  >
                    <span>{isFr ? 'TRANSMETTRE À INFO@DRCNEXUS.COM' : 'TRANSMIT TO INFO@DRCNEXUS.COM'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t text-xs shrink-0 relative z-10 transition-colors duration-300 ${
        isLight ? 'bg-slate-100/80 border-slate-200 text-slate-700' : 'bg-[#0A0D16] border-slate-800/80 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button onClick={() => { setActiveNav('Home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer focus:outline-none shrink-0">
              <DNLogo size="sm" isFr={isFr} isLight={isLight} layout="horizontal" />
            </button>
          </div>

          {/* Quick Links Menu */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm font-semibold">
            <span className={`text-[11px] font-mono font-bold uppercase tracking-widest mr-1 ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              {isFr ? 'NAVIGATION :' : 'NAVIGATION:'}
            </span>
            {(['Home', 'Pillars', 'Markets', 'Team', 'Partners', 'Contact'] as NavTab[]).map((tab) => {
              const labelMap: Record<NavTab, { en: string; fr: string }> = {
                Home: { en: 'Home', fr: 'Accueil' },
                Pillars: { en: 'Pillars', fr: 'Piliers' },
                Markets: { en: 'Markets', fr: 'Marchés' },
                Team: { en: 'Team', fr: 'Équipe' },
                Partners: { en: 'Partners', fr: 'Partenaires' },
                Contact: { en: 'Contact', fr: 'Contact' }
              };
              const isActive = activeNav === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveNav(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-all cursor-pointer ${
                    isActive
                      ? isLight ? 'text-amber-900 font-extrabold underline underline-offset-4 decoration-amber-600' : 'text-[#FBBF24] font-extrabold'
                      : isLight ? 'text-slate-600 hover:text-amber-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {labelMap[tab][isFr ? 'fr' : 'en']}
                </button>
              );
            })}
          </div>
        </div>

        {/* System Bar & Copyright Notice */}
        <div className={`border-t px-6 md:px-10 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono transition-colors duration-300 ${
          isLight ? 'bg-slate-200/60 border-slate-200 text-slate-600' : 'bg-[#05070D] border-slate-800/60 text-slate-500'
        }`}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-amber-600' : 'bg-amber-400'}`} />
              <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                {isFr ? 'NŒUD : KIN-01' : 'NODE: KIN-01'}
              </span>
            </div>
            <span>•</span>
            <div>{isFr ? 'LATENCE : 14ms' : 'LATENCY: 14ms'}</div>
            <span>•</span>
            <div>{isFr ? 'CHIFFREMENT : AES-256' : 'ENCRYPTION: AES-256'}</div>
          </div>

          <div className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            {isFr ? '© 2026 DRC Nexus. Tous droits réservés.' : '© 2026 DRC Nexus. All rights reserved.'}
          </div>
        </div>
      </footer>

      {/* HUB ACCESS MODAL */}
      {isHubModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-6 border ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#131B2E] border-slate-800 text-slate-100'
          }`}>
            <button
              onClick={() => setIsHubModalOpen(false)}
              className={`absolute top-4 right-4 transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`flex items-center gap-3 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm ${
                isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
              }`}>
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isFr ? 'Authentification Hub' : 'Hub Access Portal'}
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {isFr ? 'Nœud Sécurisé Node-KIN-01' : 'Secure Node Node-KIN-01'}
                </p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsHubModalOpen(false); }} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {isFr ? 'Identifiant Nexus / Email' : 'Nexus ID / Email'}
                </label>
                <input
                  type="text"
                  defaultValue="operator.kinshasa@nexus.drc"
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#0E1424] border-slate-700/80 text-slate-100'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {isFr ? 'Clé de Sécurité Encadrement' : 'Security Token Key'}
                </label>
                <input
                  type="password"
                  defaultValue="••••••••••••••••"
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#0E1424] border-slate-700/80 text-slate-100'
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer uppercase tracking-wider border ${
                    isLight
                      ? 'bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] hover:from-[#1E40AF] hover:to-[#2563EB] text-white border-blue-400/40 shadow-blue-600/20'
                      : 'bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white border-blue-400/20'
                  }`}
                >
                  {isFr ? 'INITIALISER LA SESSION SÉCURISÉE' : 'INITIALIZE SECURE SESSION'}
                </button>
              </div>
            </form>

            <div className={`text-[10px] text-center font-mono ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              RESTRICTED SYSTEM • UNINSTRUCTED ACCESS LOGGED
            </div>
          </div>
        </div>
      )}

      {/* INTELLIGENCE NETWORK MODAL */}
      {isIntelNetworkOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[85vh] flex flex-col relative shadow-2xl space-y-6 border ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#131B2E] border-slate-800 text-slate-100'
          }`}>
            <button
              onClick={() => setIsIntelNetworkOpen(false)}
              className={`absolute top-4 right-4 transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`flex items-center gap-3 border-b pb-4 shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm ${
                isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
              }`}>
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isFr ? 'Réseau d\'Intelligence Régional' : 'Regional Intelligence Network'}
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {isFr ? 'Supervision des 124 projets actifs en RDC' : 'Overseeing 124 active development projects across DRC'}
                </p>
              </div>
            </div>

            <div className="relative shrink-0">
              <Search className={`w-4 h-4 absolute left-3 top-3 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder={isFr ? "Rechercher par province, secteur, ou code..." : "Filter by province, sector, or project code..."}
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className={`w-full border rounded-lg pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    : 'bg-[#0E1424] border-slate-700/80 text-slate-100 placeholder-slate-500'
                }`}
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isLight
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 hover:border-amber-500'
                      : 'bg-[#0E1424] border-slate-800/80 hover:border-[#C8A97E]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                        isLight ? 'text-amber-900 bg-amber-100 border-amber-300' : 'text-[#E5C188] bg-[#C8A97E]/10 border-[#C8A97E]/30'
                      }`}>
                        {project.code}
                      </span>
                      <span className={`text-[10px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {project.province}
                      </span>
                    </div>
                    <div className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {isFr ? project.nameFr : project.name}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`text-xs font-bold ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>{project.budget}</div>
                    <div className={`text-[10px] font-mono font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                      {project.completion}% {isFr ? 'Achevé' : 'Completed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`border-t pb-1 pt-4 text-center shrink-0 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <button
                onClick={() => setIsIntelNetworkOpen(false)}
                className={`text-xs transition-colors cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFr ? 'Fermer la vue intelligence' : 'Close Intelligence View'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-6 border ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#131B2E] border-slate-800 text-slate-100'
          }`}>
            <button
              onClick={() => setSelectedProject(null)}
              className={`absolute top-4 right-4 transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                isLight ? 'text-amber-900 bg-amber-100 border-amber-300' : 'text-[#E5C188] bg-[#C8A97E]/10 border-[#C8A97E]/30'
              }`}>
                {selectedProject.code}
              </span>
              <h3 className={`text-xl font-bold mt-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isFr ? selectedProject.nameFr : selectedProject.name}
              </h3>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {selectedProject.province} Province • {isFr ? selectedProject.sectorFr : selectedProject.sector}
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E1424] border-slate-800/80'}`}>
                  <span className={`text-[10px] uppercase tracking-widest block mb-1 ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                    {isFr ? 'Financement Approuvé' : 'Approved Budget'}
                  </span>
                  <span className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedProject.budget}</span>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E1424] border-slate-800/80'}`}>
                  <span className={`text-[10px] uppercase tracking-widest block mb-1 ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                    {isFr ? 'Statut' : 'Status'}
                  </span>
                  <span className={`text-base font-bold ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>
                    {isFr ? selectedProject.statusFr : selectedProject.status}
                  </span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E1424] border-slate-800/80'}`}>
                <span className={`text-[10px] uppercase tracking-widest block mb-1 ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                  {isFr ? 'Partenaires Majeurs' : 'Lead Partner Consortium'}
                </span>
                <span className={`text-sm font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{selectedProject.leadPartner}</span>
              </div>

              <div>
                <div className={`flex justify-between text-xs mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                  <span>{isFr ? 'Progression des travaux' : 'Work Progress'}</span>
                  <span className={`font-mono font-bold ${isLight ? 'text-amber-900' : 'text-[#E5C188]'}`}>{selectedProject.completion}%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
                  <div
                    className="h-full bg-[#2563EB] rounded-full"
                    style={{ width: `${selectedProject.completion}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {isFr ? 'Fermer' : 'Close Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

