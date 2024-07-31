// style
import './MockupPage.css';

const boxList = Array.from(
  { length: 10 },
  (_, i) => `Box ${i + 1}`
);

type TMockupPageProps = {
  mockupName: string;
  isTestOverflow?: boolean;
};

function MockupPage(props: TMockupPageProps) {
  const {
    mockupName,
    isTestOverflow,
  } = props;

  return (
    <div className="MockupPage">
      <div className="MockupPage-name">
        {mockupName}
      </div>

      {isTestOverflow && (
        <div className="MockupPage-testOverflow">
          {boxList.map(box => (
            <div
              key={box}
              className="MockupPage-testOverflow-box">
              {box}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MockupPage;
