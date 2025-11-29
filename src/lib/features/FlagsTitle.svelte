<script>
    const flags = [
        { x: "-35%", y: "30%", rotate: "-5", flag: "🇪🇺" }, // eu
        { x: "-50%", y: "45%", rotate: "10", flag: "🇵🇱" }, // pl
        { x: "-75%", y: "40%", rotate: "-15", flag: "🇸🇪" }, // sw
        { x: "47%", y: "30%", rotate: "-10", flag: "🇮🇹" }, // it
        { x: "5%", y: "30%", rotate: "5", flag: "🇺🇦" }, // ua
        { x: "25%", y: "45%", rotate: "20", flag: "🇯🇵" }, // jp
        { x: "-15%", y: "40%", rotate: "-5", flag: "🇩🇪" }, // germany
        { x: "65%", y: "50%", rotate: "-5", flag: "🇪🇪" }, // es
        { x: "90%", y: "35%", rotate: "-20", flag: "🇬🇧" }, // uk
        { x: "95%", y: "65%", rotate: "-10", flag: "🇬🇷" }, // greece
        { x: "110%", y: "50%", rotate: "5", flag: "🇪🇸" }, // sp
        { x: "130%", y: "28%", rotate: "10", flag: "🇱🇻" }, // latvia
        { x: "110%", y: "75%", rotate: "20", flag: "🇦🇱" }, // ab
        { x: "140%", y: "70%", rotate: "-10", flag: "🇮🇸" }, // island
    ]

</script>

<div
    class="w-full h-full absolute top-0 left-0 rounded-sm"
    style="background-image: linear-gradient(to right bottom, oklch(0.97 0.014 254.604) 0%, oklch(0.93 0.034 272.788) 100%)"
>
    <svg
        viewBox="0 0 50 50"
        class="rounded-sm absolute bottom-0 left-0 bg-clip-text"

        style="font-weight: 700; width: 100%; height: 100%;"
    >
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="oklch(0.546 0.245 262.881)"/>
                <stop offset="100%" stop-color="oklch(0.511 0.262 276.966)"/>
            </linearGradient>
        </defs>
        <text x="-65%" y="85%" fill="url(#grad1)">
            Flags Quiz
        </text>
        {#each flags as flag}
            <text x={flag.x} y={flag.y} rotate={flag.rotate}>
                {flag.flag}
            </text>
        {/each}
    </svg>
</div>