import FractalsTitle from "$lib/features/FractalsTitle.svelte";
import sudoku from "$lib/assets/sudoku.png";
import SudokuTitle from "$lib/features/SudokuTitle.svelte";
import { PUBLIC_FLAGS_URL ,PUBLIC_FRACTALS_URL, PUBLIC_SUDOKU_URL } from "$env/static/public";
import FlagsTitle from "$lib/features/FlagsTitle.svelte";

const apps = [
    {
        href: PUBLIC_FLAGS_URL,
        gradient: ["oklch(0.693 0.161 263.565)", "oklch(0.511 0.262 276.966)"],
        Child: FlagsTitle
    },
    {
        image: sudoku,
        href: PUBLIC_SUDOKU_URL,
        gradient: ["#C0BD02", "#05ADB5"],
        Child: SudokuTitle
    },
    {
        href: PUBLIC_FRACTALS_URL,
        gradient: ["#6b9183", "#192A28", "#101717"],
        Child: FractalsTitle
    }
]

export default apps;