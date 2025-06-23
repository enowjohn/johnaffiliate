import api from '../config/axios';

export const productService = {
  async searchProducts(query, filters = {}) {
    try {
      const response = await api.get('/api/products/search', {
        params: {
          query,
          ...filters
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getProductDetails(productId) {
    try {
      const response = await api.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAffiliateLinks(productIds) {
    try {
      const response = await api.post('/api/affiliate/links', { productIds });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async trackAffiliateClick(affiliateId, productId) {
    try {
      await api.post('/api/affiliate/click', {
        affiliateId,
        productId
      });
    } catch (error) {
      throw error;
    }
  },

  async getComparisonData(productIds) {
    try {
      const response = await api.post('/api/products/compare', { productIds });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
