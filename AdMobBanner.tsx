import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

interface AdMobBannerProps {
  label?: string;
  adUnitId?: string; // ضع هنا Ad Unit ID الخاص بك
}

const AdMobBanner: React.FC<AdMobBannerProps> = ({
  label = 'إعلان ممول',
  adUnitId = 'ca-app-pub-3272418713415911/2681630855', // استبدل بالـ Ad Unit الخاص بك
}) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#888' }}>{label}</Text>
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
};

export default AdMobBanner;

