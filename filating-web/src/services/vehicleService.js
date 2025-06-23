import api from '../config/axios';

export const vehicleService = {
  async getVehicleCompatibility(make, model, year, partType) {
    try {
      const response = await api.get(`/api/vehicles/compatibility`, {
        params: {
          make,
          model,
          year,
          partType
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async searchVehicles(query) {
    try {
      const response = await api.get('/api/vehicles/search', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getVehicleParts(make, model, year) {
    try {
      const response = await api.get('/api/vehicles/parts', {
        params: { make, model, year }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
