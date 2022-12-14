import { useRef } from 'react';
import css from './AddMovie.module.css';

const AddMovies = (props) => {

  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    }
    titleRef.current.value = '';
    openingTextRef.current.value = '';
    releaseDateRef.current.value = '';
    props.onAdd(movie);
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={css.control}>
        <label htmlFor='title'>Title</label>
        <input id='title' ref={titleRef} required/>
      </div>
      <div className={css.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef} required/>
      </div>
      <div className={css.control}>
        <label htmlFor='date'>Release Date</label>
        <input id='date' ref={releaseDateRef} required/>
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovies;