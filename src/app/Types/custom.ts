export type User = {
    id: number;
    nom: string;
    prenom: string;
    email: string | undefined;
    role: number;
    mot_de_passe: string;
    mot_de_passe_confirm: string;
  };
  
  //~ Schemas
  
  //& Training
   export interface TrainingSchema {
     titre: string;
     detail: string;
   }
  

  //& User
  export interface UserSchema {
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    mot_de_passe_confirm: string;
  }
  
  //& Type
  export interface TypeSchema {
    titre: string;
  }

  //& Exercice
  export interface ExerciceSchema {
    titre: string;
    detail: string;
    illustration: string;
  }

  //& Materiel
  export interface MaterielSchema {
    nom: string;
  }

  //& Niveau
  export interface NiveauSchema {
    description: string;
    max_rep: number;
  }

