declare module 'text-to-svg' {
    interface Attributes {
        fill?: string;
        stroke?: string;
        [key: string]: string | undefined;
    }

    interface Options {
        x?: number;
        y?: number;
        fontSize?: number;
        kerning?: boolean;
        letterSpacing?: number; // in em
        tracking?: number;      // em / 1000
        anchor?: 'left' | 'center' | 'right' | 'start' | 'end' | 'top' | 'middle' | 'bottom' | 'baseline' | `${'left' | 'center' | 'right'} ${'top' | 'middle' | 'bottom' | 'baseline'}`;
        attributes?: Attributes;
    }

    interface Metrics {
        x: number;
        y: number;
        baseline: number;
        width: number;
        height: number;
        ascender: number;
        descender: number;
    }

    class TextToSVG {
        static loadSync(fontPath?: string): TextToSVG;
        static load(fontPath: string, cb: (err: Error | null, instance?: TextToSVG) => void): void;

        getD(text: string, options?: Options): string;
        getPath(text: string, options?: Options): string;
        getSVG(text: string, options?: Options): string;
        getMetrics(text: string, options?: Options): Metrics;
    }

    export = TextToSVG;
}
