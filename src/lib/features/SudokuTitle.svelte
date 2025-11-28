<script>
</script>


<div class="test absolute w-full h-full left-0 overflow-hidden top-0 contain-inline-size">
    <svg class="emojis" viewBox="10 0 100 50" width="140%" height="140%">
        <text x="0" y="80%" font-size="90%" rotate="20" text-anchor="start">
            🤡
        </text>
    </svg>
    <svg class="title" viewBox="0 0 100 20" width="100%" height="100%" >
        <text x="95%" y="85%" fill="#eee" text-anchor="end" >
            SUDOKU:)
        </text>
    </svg>
</div>
<svg class="absolute right-0 z-20"
     style="top: -15%; right: -2%; width: 15%"
     viewBox="0 0 20 20">
    <text x="20%" y="100%" rotate="-15">
        😈
    </text>
</svg>




<style>
    .test:hover > .title {
        animation: rotationAnim 500ms ease-in-out;
        transform-origin: right;
    }
    @keyframes rotationAnim {
        0% {
            transform:scaleX(1)
        }
        50% {
            transform:scaleX(2)
        }
        to {
            transform:scaleX(1)
        }
    }

    .emojis{
        transition: all;
        position: absolute;
        z-index: 10;
        top: -20%;
        left: -20%;
    }
    .title{
        font-family: Comic Sans MS,cursive;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>