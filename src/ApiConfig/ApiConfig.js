// export const baseurl = process.env.REACT_APP_BASE_URL;
// export const baseurl = "http://192.168.104.69:1990";

export const baseurl = "https://api.eleglam.co";


let base = `${baseurl}/api/v1`;
let url = `${baseurl}/api/v1/admin`;
let urlU = `${baseurl}/api/v1/user`;
let urlP = `${baseurl}/api/v1/product`;

const ApiConfig = {
  uploadFile:`${urlU}/uploadFile`,
  orderList:`${urlP}/orderList`,
  viewOrder:`${urlP}/viewOrder`,
  getWareHouse:`${url}/getWareHouse`,
  addUpdateWareHouse:`${url}/addUpdateWareHouse`,
  cancelOrder:`${urlP}/cancelOrder`,
  

  addProduct:`${urlP}/addProduct`,
  listProduct:`${urlP}/listProduct`,
  viewproduct:`${urlP}/viewproduct`,
  editProduct:`${urlP}/editProduct`,
  deleteproduct:`${urlP}/deleteproduct`,
  activeDeactiveProduct:`${urlP}/activeDeactiveProduct`,


  adminLogin: `${url}/login`,
  forgotPassword: `${url}/forgotPassword`,
  verifyOTP: `${url}/verifyOTP`,
  resendOTP: `${url}/resendOTP`,
  resetPassword: `${url}/resetPassword`,
  viewProfile: `${url}/viewProfile`,
  editProfile: `${url}/editProfile`,
  changePassword: `${url}/changePassword`,
  userList: `${url}/userList`,
  blockUnblockUser: `${url}/activeBlockUser`,
  viewUser: `${url}/viewUser`,
  userApikey: `${url}/userApikey`,
  getAllWhitelist: `${url}/getAllWhitelist`,
  addWhitelist: `${url}/addWhitelist`,
  deleteFAQ: `${url}/deleteFAQ`,
  FAQs: `${url}/FAQs`,
  addFAQ: `${url}/addFAQ`,
  aboutus: `${url}/aboutus`,
  adminDashboard: `${url}/dashBoard`,
  blockUnblockWhitelist: `${url}/blockUnblockWhitelist`,
  deleteWhitelist: `${url}/deleteWhitelist`,
  updateFaq: `${url}/updateFaq`,
  getstaticContent: `${url}/getstaticContent`,
  addUpdateStaticContent: `${url}/addUpdateStaticContent`,
  getInfluencerRequestList: `${url}/getInfluencerRequestList`,
  approveOrRejectInfluencer: `${url}/approveOrRejectInfluencer`,
  brandlists: `${url}/brandlists`,
  approveRejectBrand: `${url}/approveRejectBrand`,
  getInfluencerCategory: `${url}/getInfluencerCategory`,
  deleteInfluencerCategory: `${url}/deleteInfluencerCategory`,
  addInfluencerCategory: `${url}/addInfluencerCategory`,
  editInfluencerCategory: `${url}/editInfluencerCategory`,
  addCategory: `${url}/addCategory`,
  getCategory: `${url}/getCategory`,
  editCategory: `${url}/editCategory`,
  deleteNftCategory: `${url}/deleteNftCategory`,

  viewBrand: `${base}/brand/viewBrand`,

  getcategoryforEndpoint: `${url}/getcategoryforEndpoint`,
  addCategoryforEndpoint: `${url}/addCategoryforEndpoint`,
  getapiReferenceSubcategory: `${url}/getapiReferenceSubcategory`,
  addapiReferenceSubcategory: `${url}/addapiReferenceSubcategory`,
  endpointDescription: `${url}/endpointDescription`,
  deleteEndpoint: `${url}/deleteEndpoint`,
  blockUnblockEndpoint: `${url}/blockUnblockEndpoint`,
  deleteApiReferenceSubcategory: `${url}/deleteApiReferenceSubcategory`,
  deleteCategoryforEndpoint: `${url}/deleteCategoryforEndpoint`,

  viewEndPointDetails: `${url}/viewEndPointDetails`,
  editApiReferenceSubcategory: `${url}/editApiReferenceSubcategory`,
  viewapiReferenceSubcategory: `${url}/viewapiReferenceSubcategory`,
  endpointList: `${url}/endpointList`,

  getHitrates: `${url}/getHitrates`,
  editHitrates: `${url}/editHitrates`,

  addAnnouncement: `${url}/addAnnouncement`,
  editAnnouncement: `${url}/editAnnouncement`,
  getAllAnnouncement: `${url}/getAllAnnouncement`,
  deleteAnnouncement: `${url}/deleteAnnouncement`,
  blockUnblockAnnouncement: `${url}/blockUnblockAnnouncement`,

  addPartner: `${url}/addPartner`,
  editPartner: `${url}/editPartner`,
  partnerList: `${url}/partnerList`,
  deletePartner: `${url}/deletePartner`,
  blockUnblockPartner: `${url}/blockUnblockPartner`,
};
export default ApiConfig;





