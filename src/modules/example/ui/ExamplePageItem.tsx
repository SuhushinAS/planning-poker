import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/lib/hooks';
import { EmptyKey } from 'src/modules/common/ui/EmptyKey';
import { exampleLinks } from 'src/modules/example/lib/constants';
import { selectExampleItem } from 'src/modules/example/lib/selectors';
import { ExampleHead } from 'src/modules/example/ui/ExampleHead';
import { ExampleItem } from 'src/modules/example/ui/ExampleItem';
import { Message } from 'src/modules/locale/ui/Message';

export const ExamplePageItem = () => {
  const { exampleId = '' } = useParams();
  const example = useAppSelector(selectExampleItem(exampleId));

  if (!example) {
    return (
      <div className="box">
        <EmptyKey description="example.item.notFound" title="example.item.notFoundTitle" />
      </div>
    );
  }

  return (
    <div className="box">
      <ExampleHead
        linkText={<Message id="example.list.title" />}
        linkUrl={exampleLinks.list({})}
        title={example.name}
      />
      <ExampleItem example={example} />
    </div>
  );
};
