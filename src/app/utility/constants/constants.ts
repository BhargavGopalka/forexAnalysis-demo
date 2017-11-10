export class Constant {
  public static recordsPerPage: number[] = [10, 20, 30];
  public static baseUrl = `http://104.236.11.8:3000/`;
  public static config = `public/config`;
  public static getUser = `api/admin/customer/getUsers`;
  public static updateUser = `api/admin/customer/updateUser`;
  public static getNews = `api/admin/latestNews/getAll`;
  public static addNews = `api/admin/latestNews/add`;
  public static updateNews = `api/admin/latestNews/update`;
  public static deleteNews = `api/admin/latestNews/delete`;
  public static enaDisNews = `api/admin/latestNews/enableDisable`;
  public static enaDisFaq = `api/admin/faqs/enableDisable`;
}
