export interface CUSTOM_FIELD_TYPE {
  customFieldId: string;
  customKey: string;
  customValue: string;
}

export interface MEMBERSHIP_TYPE {
  membershipId: string;
  organisationId: string;
  roleName: string;
  token: string;
}

export interface KYC_DETAILS_TYPE {
  documents: any[]; // the type of documents is not provided in the object
}

export interface APP_TYPE {
  appName: string;
}

export interface USER_PROFILE_TYPE {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  lastLoginAt: string;
  contacts: any[]; // the type of contacts is not provided in the object
  addresses: any[]; // the type of addresses is not provided in the object
  listCustomFields: CUSTOM_FIELD_TYPE[];
  employmentDetails: any[]; // the type of employmentDetails is not provided in the object
  memberships: MEMBERSHIP_TYPE[];
  kycDetails: KYC_DETAILS_TYPE;
  apps: APP_TYPE[];
  listRoles: string[];
  permissions: any[]; // the type of permissions is not provided in the object
  createdAt: string;
  passwordExpired: boolean;
  updatedAt: string;
}

export interface STATUS {
  code: string;
  message: string;
}

export interface USER_RESPONSE_TYPE {
  data: USER_PROFILE_TYPE;
  status: STATUS;
}
