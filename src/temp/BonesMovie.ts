import Movie from "../entity/Movie";

const bones = new Movie();
bones.title = "Bones";
bones.actors = new Array<string>();
bones.actors.push("Snoop Dog", "Pam Grier");
bones.formats = new Array<string>();
bones.formats.push("DVD");
bones.genres = new Array<string>();
bones.genres.push("Horror");

export default bones;