import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUserData,
  signOut,
  closeBudget,
} from 'loot-core/src/client/actions';
import {
  View,
  Text,
  Button,
  Tooltip,
  Menu,
} from 'loot-design/src/components/common';
import { colors } from 'loot-design/src/style';

import { useServerURL } from './ServerContext';

export default function LoggedInUser({ style }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.data);
  const loading = !userData;
  const [menuOpen, setMenuOpen] = useState(false);
  const serverUrl = useServerURL();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  async function onChangePassword() {
    await dispatch(closeBudget());
    window.__history.push('/change-password');
  }

  function onMenuSelect(type) {
    setMenuOpen(false);

    switch (type) {
      case 'change-password':
        dispatch(onChangePassword());
        break;
      case 'sign-out':
        dispatch(signOut());
        break;
      default:
    }
  }

  async function onClick() {
    if (!serverUrl) {
      await dispatch(closeBudget());
      window.__history.push('/config-server');
    } else if (userData) {
      setMenuOpen(true);
    } else {
      await dispatch(closeBudget());
      window.__history.push('/login');
    }
  }

  if (loading) {
    return (
      <Text style={[{ color: colors.n5, fontStyle: 'italic' }, style]}>
        Loading account...
      </Text>
    );
  } else if (userData) {
    if (userData.offline) {
      return <View style={style}>Offline</View>;
    }

    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
        <Button bare onClick={onClick}>
          {serverUrl ? 'Server' : 'No server'}
        </Button>

        {menuOpen && (
          <Tooltip
            position="bottom-right"
            style={{ padding: 0 }}
            onClose={() => setMenuOpen(false)}
          >
            <Menu
              onMenuSelect={onMenuSelect}
              items={[
                { name: 'change-password', text: 'Change password' },
                { name: 'sign-out', text: 'Sign out' },
              ]}
            />
          </Tooltip>
        )}
      </View>
    );
  } else {
    return (
      <Button bare onClick={onClick} style={style}>
        Not logged in
      </Button>
    );
  }
}
