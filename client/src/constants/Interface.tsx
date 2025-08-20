export interface CategoryList {
  id: number;
  name: string;
  code: string;
  status: number; 
}
export type CategoryListTable = CategoryList[];

export interface AuthorList {
  id: number;
  name: string;
  code: string;
  status: number; 
}
export type AuthorListTable = AuthorList[];

export interface PublisherList {
  id: number;
  name: string;
  code: string;
  status: number; 
}
export type PublisherListTable = PublisherList[];

export interface SeriesList {
  id: number;
  name: string;
  code: string;
  status: number; 
}
export type SeriesListTable = SeriesList[];

export interface SettingList {
  id: number;
  key: string;
  value: string;
  group: number; 
  type: number; 
}
export type SettingListTable = SettingList[];


export interface PermisstionList {
 id: number;
  name: string;
  code: string;
  status: number;
}
export type PermisstionListTable = PermisstionList[];

export interface ActionList {
 id: number;
  name: string;
  code: string;
  status: number;
}
export type ActionListTable = ActionList[];

export interface PermisstionDetailList {
 id: number;
  name: string;
  code: string;
  status: number;
}
export type PermisstionDetailListTable = PermisstionDetailList[];


export interface ProductlList {
  id: number;
   name: string;
   code: string;
   status: number;
 }
 export type ProductListTable = ProductlList[];

 export interface RoleList {
  id: number;
   name: string;
   code: string;
   status: number;
 }
 export type RoleListTable = RoleList[];

 export interface StaffList {
  id: number;
  username: string;
  code: string;
  fullname: string;
  email: string;
  status: number; 
}
export type StaffListTable = StaffList[];

 export interface BannerList {
  id: number;
   name: string;
   code: string;
   status: number;
 }
 export type BannerListTable = BannerList[];

  export interface ActiveLogList {
  id: number;
   name: string;
   code: string;
   status: number;
 }
 export type ActiveLogListTable = ActiveLogList[];
