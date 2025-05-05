import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import outputs from "../amplify_outputs.json";

export const NewPasswordPage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const stored = localStorage.getItem('newPasswordUser');
  if (!stored) {
    navigate('/login');
    return null;
  }

  const userPool = new CognitoUserPool({
    UserPoolId: outputs.auth.user_pool_id,
    ClientId: outputs.auth.user_pool_client_id,
  });

  const userData = JSON.parse(stored);
  const user = new CognitoUser({
    Username: userData.username,
    Pool: userPool
  });

  const handleSubmit = () => {
    // パスワード一致チェック
    if (newPassword !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    user.completeNewPasswordChallenge(newPassword, {}, {
      onSuccess: (session) => {
        localStorage.setItem('jwtToken', session.getAccessToken().getJwtToken());
        localStorage.setItem('jwtTokenExpiry', String(Date.now() + 600000));
        localStorage.removeItem('newPasswordUser');
        navigate('/');
      },
      onFailure: (err) => {
        console.error(err);
        setError(err.message || 'パスワード変更に失敗しました');
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        パスワードの変更
      </Typography>

      <TextField
        label="新しいパスワード"
        type="password"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <TextField
        label="新しいパスワード（確認用）"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        パスワードを変更してログイン
      </Button>
    </Container>
  );
};
