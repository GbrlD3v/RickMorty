import style from "../styles/card.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite, removeFavorite,removeCharacter } from "../../redux/actions";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

function Card({
  name,
  status,
  image,
  id,
  addFavorite,
  removeFavorite,
  myFavorite,
  removeCharacter,
}) {
  const aliveOrDead = () => {
    if (status === "Alive") {
      return style.alive;
    } else if (status === "Dead") {
      return style.dead;
    } else {
      return style.unknown;
    }
  };

  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      removeFavorite(id);
    } else {
      setIsFav(true);
      addFavorite({ name, status, image, id });
    }
  };

  useEffect(() => {
    if (myFavorite.find((char) => char.id === id)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [myFavorite]);

  const handleRemove = (id) => {
    removeCharacter(id);
    const notify = () => toast.success("Personaje eliminado con exito!");
    notify();
  }

  const ruta = useLocation();
  return (
    <div className={style.container}>
      {ruta.pathname === "/dashboard" ? (
        <button className={style.btn} onClick={()=>handleRemove(id)}>
          X
        </button>
      ) : null}
      <strong className={style.name}>{name}</strong>
      <div className={style.card}>
        <img src={image} alt={name} className={style.img} />
        <h2 className={aliveOrDead()}>{status}</h2>
      </div>
      <div className={style.FavAnM}>
      <Link to={`/details/${id}`}>
        <button className={style.moreIn}>More Info</button>
      </Link>
      {isFav ? (
        <button className={style.fav} onClick={handleFavorite}>
          Remove ❤️
        </button>
      ) : (
        <button className={style.favR} onClick={handleFavorite}>
          Add 🤍
        </button>
      )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (character) => {
      dispatch(addFavorite(character));
    },
    removeFavorite: (id) => {
      dispatch(removeFavorite(id));
    },
    removeCharacter: (id) => {
      dispatch(removeCharacter(id));
    }
  };
};
const napStateToProps = (state) => {
  return {
    myFavorite: state.myFavorite,
    chararacters : state.chararacters
  };
};
export default connect(napStateToProps, mapDispatchToProps)(Card);
