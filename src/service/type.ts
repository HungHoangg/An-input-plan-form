export type ADS = {
  name: string;
  quantity: number;
};

export type SUB_CAMPAIGNS = {
  name: string;
  status: boolean;
  ads: Array<ADS>;
};

export type INFORMATION = {
  name: string;
  describe?: string;
};

export type AWING_FORM = {
  information: INFORMATION
  subCampaigns: Array<SUB_CAMPAIGNS>
};
