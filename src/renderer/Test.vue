<template>
    <div>
        <div>+++{{ count }}</div>
        <button @click="triggerConfetti">trigger Confetti</button>
        <button @click="mainPanel.openGithub">open Github</button>
    </div>
</template>

<script>
import confetti from "canvas-confetti";

export default {
    name: "Test",
    props: {
        mainPanel: Object,
    },
    data() {
        return {
            count: 0,
        };
    },
    mounted() {
        setInterval(() => {
            this.count++;
        }, 1000);
    },
    methods: {
        triggerConfetti() {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
            };

            function fire(particleRatio, opts) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio),
                });
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
            });
            fire(0.2, {
                spread: 60,
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2,
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
            });
        },
    },
};
</script>

<style>
</style>