import * as commonColor from 'commonColor';
import { objectMerge } from 'utils/helpers';

import FAQStyles from 'containers/FaqScene/styles';

export default {
  ...objectMerge(FAQStyles,
    {
      subTitle: {
        fontSize: 16,
        color: commonColor.black,
        marginBottom: 12,
      },
      divider: {
        fontSize: 14,
        color: commonColor.grey650,
        marginBottom: 32,
      },
      noteText: {
        fontSize: 14,
        color: commonColor.grey650,
        marginBottom: 12,
      },
      linkText: {
        fontSize: 14,
        color: commonColor.brand,
        textDecorationLine: 'underline',
      },
    }),
};
