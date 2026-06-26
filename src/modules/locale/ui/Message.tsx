import { FormattedMessage } from 'react-intl';
import { defaultMessage } from 'src/modules/locale/lib/constants';

export const Message: typeof FormattedMessage = (props) => (
  <FormattedMessage {...props} defaultMessage={defaultMessage} />
);
