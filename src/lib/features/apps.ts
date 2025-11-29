import FractalsTitle from "$lib/features/FractalsTitle.svelte";
import sudoku from "$lib/assets/sudoku.png";
import SudokuTitle from "$lib/features/SudokuTitle.svelte";
import { PUBLIC_FRACTALS_URL, PUBLIC_SUDOKU_URL } from "$env/static/public";

const apps = [
    {
        href: PUBLIC_FRACTALS_URL,
        gradient: ["#6b9183", "#192A28", "#101717"],
        Child: FractalsTitle
    },
    {
        image: sudoku,
        href: PUBLIC_SUDOKU_URL,
        gradient: ["#C0BD02", "#05ADB5"],
        Child: SudokuTitle
    }
]

export default apps;