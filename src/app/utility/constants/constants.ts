export class Constant {
  public static baseUrl = `http://104.236.11.8:3000/`;
  public static adminLogin = `public/adminLogin`;
  public static config = `public/config`;
  public static packages = `public/packages`;
  public static getUser = `api/admin/customer/getUsers`;
  public static updateUser = `api/admin/customer/updateUser`;
  public static getSubscription = `api/admin/subscription/getPlans`;
  public static addSubscription = `api/admin/subscription/addPlan`;
  public static updateSubscription = `api/admin/subscription/updatePlan`;
  public static addCoupon = `api/admin/coupanCode/add`;
  public static updateCoupon = `api/admin/coupanCode/update`;
  public static getCoupon = `api/admin/coupanCode/getAll`;
  public static deleteCoupon = `api/admin/coupanCode/delete`;
  public static getCouponPeople = `api/admin/coupanCode/coupan/getAll`;
  public static getNews = `api/admin/latestNews/getAll`;
  public static getFaq = `api/admin/faqs/getAll`;
  public static updateFaq = `api/admin/faqs/update`;
  public static deleteFaq = `api/admin/faqs/delete`;
  public static addFaq = `api/admin/faqs/add`;
  public static addNews = `api/admin/latestNews/add`;
  public static updateNews = `api/admin/latestNews/update`;
  public static deleteNews = `api/admin/latestNews/delete`;
  public static enaDisUser = `api/admin/customer/enableDisable`;
  public static enaDisSubscription = `api/admin/subscription/enableDisable`;
  public static enaDisNews = `api/admin/latestNews/enableDisable`;
  public static enaDisFaq = `api/admin/faqs/enableDisable`;
  public static getIssue = `api/admin/contactUs/getAll`;
  public static deleteIssue = `api/admin/contactUs/delete`;
}

export class PaginationItems {
  public static paginationArray: number[] = [10, 20, 30];
  public static initialRecords: number = PaginationItems.paginationArray[0];
}
