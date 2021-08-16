import { IconType } from "react-icons";
import {
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSunny,
  TiWeatherStormy,
  TiWeatherSnow,
  TiWeatherCloudy
} from "react-icons/ti";

export function WeatherIcon(sigla: string): IconType {
  let icon: IconType = TiWeatherPartlySunny

  switch (sigla) {
    case 'pp':
    case 'pt':
    case 'pm':
    case 'np':
    case 'pnt':
    case 'npt':
    case 'npn':
    case 'npm':
    case 'ppn':
    case 'ppt':
    case 'ppm':
    case 'pc':
    case 't':
      icon = TiWeatherStormy
      break;
    case 'ps':
    case 'cl':
      icon = TiWeatherSunny
      break;
    case 'c':
    case 'ci':
    case 'in':
    case 'cm':
    case 'cn':
    case 'cv':
    case 'ch':
    case 'psc':
    case 'pcm':
    case 'pct':
    case 'pcn':
    case 'ncn':
    case 'nct':
    case 'ncm':
    case 'npp':
      icon = TiWeatherShower
      break;
    case 'g':
    case 'ne':
      icon = TiWeatherSnow
      break
    case 'ec':
    case 'pn':
    case 'e':
    case 'n':
    case 'vn':
      icon = TiWeatherCloudy
      break
    default:
      break;
  }

  return icon

}