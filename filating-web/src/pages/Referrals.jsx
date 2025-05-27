import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid, TextField, 
  CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import { api } from '../services/api';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  color: 'white',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ReferralCard = styled(Card)(({ theme }) => ({
  background: '#1E1E1E',
  color: 'white',
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [referralLink, setReferralLink] = useState('');
  const [stats, setStats] = useState({
    totalReferrals: 0,
    pendingReferrals: 0,
    totalEarnings: 0,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchReferralData();
    generateReferralLink();
  }, []);

  const fetchReferralData = async () => {
    try {
      const [referralsData, statsData] = await Promise.all([
        api.get('/referrals'),
        api.get('/referrals/stats'),
      ]);
      setReferrals(referralsData.data);
      setStats(statsData.data);
    } catch (error) {
      console.error('Error fetching referral data:', error);
      showSnackbar('Failed to load referral data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const generateReferralLink = async () => {
    try {
      const response = await api.post('/referrals/generate-link');
      setReferralLink(response.data.link);
    } catch (error) {
      console.error('Error generating referral link:', error);
      showSnackbar('Failed to generate referral link', 'error');
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    showSnackbar('Referral link copied to clipboard!', 'success');
  };

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join AutoPartsHub',
          text: 'Check out this amazing auto parts platform!',
          url: referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyReferralLink();
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Referral Program
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Referral Link
              </Typography>
              <Box display="flex" gap={2} alignItems="center">
                <TextField
                  fullWidth
                  value={referralLink}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    sx: { bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={copyReferralLink}
                  startIcon={<ContentCopyIcon />}
                >
                  Copy
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={shareReferralLink}
                  startIcon={<ShareIcon />}
                >
                  Share
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ReferralCard>
            <CardContent>
              <Typography variant="h6">Total Referrals</Typography>
              <Typography variant="h3">{stats.totalReferrals}</Typography>
            </CardContent>
          </ReferralCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ReferralCard>
            <CardContent>
              <Typography variant="h6">Pending Referrals</Typography>
              <Typography variant="h3">{stats.pendingReferrals}</Typography>
            </CardContent>
          </ReferralCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ReferralCard>
            <CardContent>
              <Typography variant="h6">Total Earnings</Typography>
              <Typography variant="h3">${stats.totalEarnings}</Typography>
            </CardContent>
          </ReferralCard>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Recent Referrals
          </Typography>
          {referrals.map((referral) => (
            <ReferralCard key={referral.id}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1">
                      {referral.referredUser}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">
                      Status: {referral.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">
                      Joined: {new Date(referral.joinedAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </ReferralCard>
          ))}
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Referrals;
