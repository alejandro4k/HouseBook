import {Dimensions} from 'react-native';
export const {width,height} = Dimensions.get('window')
export const Size =64;
export const Icon_Size =Size*0.6
export const Spacing = 10;
const s = width*0.68;

export const dimensionsTheme = {
    ITEM_WITH :s,
    ITEM_HEIGHT: s*0.68,
    RADIUS :18,
    Spacing,
    FULL_SIZE:s+Spacing*2 
}