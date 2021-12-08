// @flow
import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import apiClient from '../../../utils/apiClient';

const CategoriesContainer = (): React$Node => {
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const selected = localStorage.getItem('i18nextLng') || 'en';

        const { data } = await apiClient.get('options/professions', {
          params: {
            lang: { en: 'ENGLISH', hi: 'HINDI' }[selected],
          },
        });

        setProfessions(data);
      } catch (e) {}
    })();
  }, []);

  return <Categories professions={professions} />;
};

export default CategoriesContainer;
