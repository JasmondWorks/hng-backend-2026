export interface Profile {
  id: string;
  name: string;
  gender: string | null;
  probability: number;
  sampleSize: number;
  isConfident: boolean;
  createdAt: Date;
}

export class GenderizeExternalApiResponse {
  name!: string;
  gender!: string | null;
  probability!: number;
  count!: number;
}
export class AgifyExternalApiResponse {
  name!: string;
  age!: number;
  count!: number;
}
export class NationalizeExternalApiResponse {
  name!: string;
  count!: number;
  country: { country_id: string; probability: number }[] = [];
}

export class ProfileResponse {
  name!: string;
  gender!: string | null;
  gender_probability!: number;
  sample_size!: number;
  age!: number;
  age_group!: string;
  country_id!: string;
  country_probability!: number;
  created_at!: string;
}

export class ProfileShortResponse {
  id!: string;
  name!: string;
  gender!: string | null;
  age!: number;
  age_group!: string;
  country_id!: string;
}
