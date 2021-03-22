import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from '../../../axios-jw';
import styles from './Providers.module.css';

const imgSize = 's100';
const jwproviders = [
  {
    id: 119,
    name: 'Amazon Prime',
    img: '52449861',
  },
  {
    id: 9,
    name: 'Amazon Prime',
    img: '52449861',
  },
  {
    id: 8,
    name: 'Netflix',
    img: '207360008',
  },
  { id: 280, name: 'HBO GO', img: '127424441' },
  { id: 27, name: 'HBO Now', img: '127424441' },
  { id: 505, name: 'Player', img: '209564731' },
  { id: 350, name: 'Apple TV+', img: '152862153'}
];

const Providers = (props) => {
  const { t } = useTranslation();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const title = props.title;
    axios
      .post('titles/pl_PL/popular?language=en', {
        content_types: null,
        presentation_types: null,
        providers: null,
        genres: null,
        languages: null,
        release_year_from: null,
        release_year_until: null,
        monetization_types: null,
        min_price: null,
        max_price: null,
        scoring_filter_types: null,
        cinema_release: null,
        query: title,
        page: null,
        page_size: 10,
      })
      .then((res) => {
        console.log('[JWP Data]', title, res.data)

        if (res.data.total_results > 0) {
          const movie = res.data.items.find((item) => item.title === title);
          console.log('[Movie]', movie)
          if (movie && movie.offers) {
            console.log('[Movie providers]', movie.offers)
            matchMovieProviders(movie.offers);
          }
        }
      });
  }, [props.title]);

  const matchMovieProviders = (providers) => {
    const matchedProviders = [];
    for (const provider of providers) {
      if (matchedProviders.indexOf(provider.provider_id) === -1) {
        matchedProviders.push(provider.provider_id);
      }
    }
    setProviders(matchedProviders);
  };

  let validProviders = providers.reduce((res, next) => {
    let jwp = jwproviders.find((item) => item.id === next);
    if(jwp) {
      res.push(jwp)      
    }
    return res;
  }, []);

let output = <span>{t('NoStreamProvider')}</span>;
  if(validProviders.length > 0) {
    output = (
      <React.Fragment>     
        <div className={styles.Text}>{t('availableOn')}</div>
        <div>
          {validProviders.map(item => 
          <img
            key={item.id}
            title={item.name}
            src={'https://images.justwatch.com/icon/' + item.img + '/' + imgSize}
            alt={item.name}
          />)}
        </div>
      </React.Fragment>
    );
  }

  return (
  <div className={styles.Providers}>
    {output}
  </div>
  );
};

export default Providers;
