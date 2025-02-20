import SearchPanel from '../SearchPanel';
import './promo.scss';

export default function MainPromo() {
  return (
    <section className="section--base">
      <div className="container">
        <div className="promo__wrapper">
          <h1 className="title title--main promo__title">
            let's find some <span>art</span>
            <br></br>here!
          </h1>
          <SearchPanel />
        </div>
      </div>
    </section>
  );
}
