"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Code2,
  Briefcase,
  GraduationCap,
  User,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Globe,
  Database,
  Server,
  Layers3,
} from "lucide-react";

// ─── Tech Icon SVG Paths ──────────────────────────────────────────────────────
// Each entry: { path: SVG path d="...", color: brand hex, viewBox (optional) }
const TECH_ICONS: Record<string, { path: string; color: string; viewBox?: string }> = {
  // Frontend
  html: {
    color: "#E34F26",
    viewBox: "0 0 24 24",
    path: "M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z",
  },
  css: {
    color: "#1572B6",
    viewBox: "0 0 24 24",
    path: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z",
  },
  javascript: {
    color: "#F7DF1E",
    viewBox: "0 0 24 24",
    path: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z",
  },
  react: {
    color: "#61DAFB",
    viewBox: "0 0 24 24",
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
  },
  tailwindcss: {
    color: "#06B6D4",
    viewBox: "0 0 24 24",
    path: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z",
  },
  windowsforms: {
    color: "#5C2D91",
    viewBox: "0 0 24 24",
    path: "M11.5 2l-9.5 2.5v15l9.5 2.5V2zm1 .18V21.82L22 19.5V4.5L12.5 2.18zM3 6.5h2v1H3v-1zm0 2.5h2v1H3V9zm0 2.5h2v1H3V11.5zm0 2.5h2v1H3V14zm10-7.5h6v1h-6V6.5zm0 2.5h6v1h-6V9zm0 2.5h6v1h-6V11.5zm0 2.5h6v1h-6V14z",
  },
  // Backend
  nodejs: {
    color: "#339933",
    viewBox: "0 0 24 24",
    path: "M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242L11.13 1.604a.271.271 0 0 0-.271 0L2.073 6.68c-.085.05-.139.146-.139.241v10.15c0 .097.054.189.139.235l2.409 1.391c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.019c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.226 18.439a1.847 1.847 0 0 1-.92-1.597V6.921c0-.659.353-1.272.92-1.599L9.019.247a1.886 1.886 0 0 1 1.866 0l7.793 4.075c.567.328.92.94.92 1.599v10.15c0 .659-.353 1.271-.92 1.597l-7.793 4.085c-.28.163-.6.247-.887.247zm2.42-6.993c-3.855 0-4.663-1.77-4.663-3.255 0-.142.114-.253.256-.253h1.138c.127 0 .233.092.252.217.172 1.161.684 1.748 3.017 1.748 1.857 0 2.646-.420 2.646-1.405 0-.568-.226-.991-3.119-1.274-2.418-.239-3.912-.773-3.912-2.708 0-1.783 1.503-2.846 4.024-2.846 2.829 0 4.231.982 4.408 3.091a.255.255 0 0 1-.065.196.257.257 0 0 1-.189.083H16.09a.256.256 0 0 1-.248-.196c-.276-1.222-.946-1.614-2.776-1.614-2.044 0-2.283.712-2.283 1.247 0 .648.28.836 3.023 1.202 2.717.362 4.008.877 4.008 2.769-.001 1.925-1.605 3.002-4.396 3.002z",
  },
  express: {
    color: "#ffffff",
    viewBox: "0 0 24 24",
    path: "M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.138-.82zm1.158-.228c-.48 0-1.907 0-2.84 0 .18-3.797 3.018-6.702 6.403-5.362 1.48.576 2.338 1.72 2.658 3.241a.66.66 0 01-.158.44H1.16z",
  },
  springboot: {
    color: "#6DB33F",
    viewBox: "0 0 24 24",
    path: "M20.205 16.392c-2.469 3.289-7.741 2.179-11.122 2.338 0 0-.599.034-1.201.133 0 0 .228-.097.519-.198 2.374-.821 3.496-.986 4.939-1.727 2.71-1.388 5.408-4.413 5.957-7.555-1.032 3.022-4.17 5.623-7.027 6.679-1.955.722-5.492 1.424-5.493 1.424a5.28 5.28 0 01-.143-.076C5.948 16.904 5.916 12.089 9.197 10.409c1.248-.63 2.441-.284 3.793-.626 1.443-.362 3.107-1.501 3.783-2.964 0 0 .752 3.969-3.456 5.752-2.55 1.088-6.197 1.02-6.756 3.717-.011.056-.02.112-.03.168l-.002.022a6.703 6.703 0 00-.141-1.024C5.847 12.78 7.1 10.602 8.887 9.4c2.84-1.921 6.24-2.034 8.967-3.898 1.394-.948 2.503-2.413 2.807-4.125 0 0 1.37 4.03-.278 7.064-.761 1.42-1.965 2.545-3.178 3.519zm1.692-9.728a1.946 1.946 0 01-2.748 2.747 1.946 1.946 0 012.748-2.747z",
  },
  dotnet: {
    color: "#512BD4",
    viewBox: "0 0 24 24",
    path: "M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L5.16 9.773a2.897 2.897 0 01-.239-.627h-.033c.027.293.04.707.04 1.243v5.946H3.594V7.53h1.613l3.608 6.332c.155.275.258.476.31.602h.021c-.034-.385-.051-.793-.051-1.225V7.53h1.345zM0 15.546a.935.935 0 01-.25-.68.93.93 0 01.25-.682.9.9 0 01.662-.261c.267 0 .488.087.661.261a.93.93 0 01.261.682.928.928 0 01-.261.68.9.9 0 01-.661.265A.9.9 0 010 15.546z",
  },
  csharp: {
    color: "#239120",
    viewBox: "0 0 24 24",
    path: "M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z",
  },
  php: {
    color: "#777BB4",
    viewBox: "0 0 24 24",
    path: "M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 01-.305.847 2.809 2.809 0 01-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.624H9.388l1.23-6.326h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944H12.764zm7.203-4.272l-1.23 6.326h-1.316l.122-.641c-.285.25-.59.434-.917.551a2.8 2.8 0 01-.96.164c-.609 0-1.066-.196-1.37-.589-.305-.393-.38-.944-.224-1.652l.612-3.159h1.382l-.571 2.924c-.082.422-.058.731.069.93.127.198.351.297.672.297.341 0 .636-.107.887-.322.251-.215.422-.54.513-.976l.548-2.853 1.383.0z",
  },
  java: {
    color: "#007396",
    viewBox: "0 0 24 24",
    path: "M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 .001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639",
  },
  // Database
  mongodb: {
    color: "#47A248",
    viewBox: "0 0 24 24",
    path: "M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.171-1.404-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z",
  },
  mysql: {
    color: "#4479A1",
    viewBox: "0 0 24 24",
    path: "M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.06-.14a.735.735 0 00-.202-.151zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0C.052 17.18.143 15.75.228 14.3h1.38l1.35 4.181h.01l1.36-4.18h1.32c.09 1.68.177 3.37.223 4.394zm4.017-4.155h-.99v4.083c-.217.114-.46.215-.742.215-.52 0-.668-.276-.668-.769V14.54h-.99v3.488c0 .934.395 1.42 1.38 1.42.576 0 1.04-.224 1.5-.49v.436h.51zm7.827 4.155v-3.52a1.476 1.476 0 00-1.49-1.46c-.484 0-.85.16-1.25.55l-.036-.49h-.994v4.92h.99v-3.983c.21-.183.476-.305.742-.305.515 0 .637.35.637.865v3.423zm2.12-2.62c.018-.218.044-.41.09-.567.148-.488.462-.726.95-.726.508 0 .812.196.955.726.074.234.11.516.11.867h-2.105zm2.88 1.35c-.044.337-.15.5-.275.68-.2.295-.507.46-.914.46-.598 0-.94-.36-1.035-.914a4.93 4.93 0 01-.057-.724c0-.323.028-.608.076-.857h3.082c.01-.145.012-.29.012-.437 0-.6-.09-1.054-.273-1.395-.37-.664-1.02-.997-1.906-.997-1.8 0-2.782 1.14-2.782 3.253 0 .976.21 1.74.63 2.27.42.527 1.04.787 1.87.787.79 0 1.38-.242 1.79-.74.26-.33.43-.7.49-1.19l-.708-.196zm-9.75-2.55c0-.424-.152-.655-.46-.655-.294 0-.47.175-.47.63v3.98h-.97v-4.84c.38-.19.836-.305 1.348-.305.46 0 .816.12 1.06.358.26-.246.6-.358 1.03-.358.836 0 1.26.514 1.26 1.54v3.605h-.99V14.73c-.002-.396-.148-.63-.46-.63-.286 0-.462.185-.462.64v3.955h-.885v-3.87zm-7.58 6.05H.13v-.34h4.944v.34zm19.73 0h-4.96v-.34h4.96v.34zM0 22.13h24v.34H0v-.34z",
  },
  sqlite: {
    color: "#003B57",
    viewBox: "0 0 24 24",
    path: "M21.678.521C20.467-.29 19.0 .001 17.992.491l-.036.017C15.865 1.65 14.349 3.3 13.26 5.13c-.766 1.305-1.323 2.74-1.645 4.233-.014.064-.088.1-.148.069C8.55 7.6 5.283 8.025 3.25 9.888c-.654.598-1.179 1.316-1.561 2.124-.17.354-.275.752-.31 1.15-.11 1.246.384 2.413 1.29 3.325.082.082.1.204.042.304-1.001 1.68-1.697 3.6-1.862 5.572L.83 22.5c-.025.29-.012.59.04.874.164.88.686 1.517 1.57 1.586.85.063 1.58-.48 2.014-1.18.33-.52.5-1.115.565-1.735.062-.597.057-1.2.054-1.8l-.003-.56c0-.2.24-.3.384-.17.63.566 1.353.97 2.11 1.2.98.297 2.022.285 3.08.068.056-.011.108.033.107.09-.01.52.01 1.057.093 1.59.156 1 .58 2.068 1.475 2.497.297.14.617.213.954.206.358-.008.705-.112 1.025-.276.737-.383 1.157-1.12 1.39-1.9.25-.84.283-1.737.28-2.623l-.004-1.245c.001-.13.097-.237.224-.256C20.23 18.548 23.98 14.48 23.98 9.55c0-3.587-1.006-6.67-2.303-9.03zm-7.21 17.97c-.045-.058-.027-.14.037-.177 1.025-.582 1.88-1.364 2.563-2.285.073-.1.22-.078.262.034.184.49.325 1.005.405 1.538.026.172.044.346.054.52.004.083-.069.148-.148.13a10.555 10.555 0 01-3.173-1.76z",
  },
  // Tools
  github: {
    color: "#ffffff",
    viewBox: "0 0 24 24",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  figma: {
    color: "#F24E1E",
    viewBox: "0 0 24 24",
    path: "M5.809 23.136c2.077 0 3.765-1.689 3.765-3.765v-3.765H5.809A3.766 3.766 0 002.044 19.37a3.766 3.766 0 003.765 3.765zm0-9.412h3.765V9.96H5.809A3.766 3.766 0 002.044 13.724a3.766 3.766 0 003.765 3.765zm0-7.529A3.766 3.766 0 002.044 9.96a3.766 3.766 0 003.765 3.765h3.765V6.196H5.809zM9.574.864H5.809A3.766 3.766 0 002.044 4.63a3.766 3.766 0 003.765 3.765h3.765zm3.765 9.412a3.766 3.766 0 003.765-3.764 3.766 3.766 0 00-3.765-3.765v7.53zm0 .882a3.765 3.765 0 000 7.53 3.766 3.766 0 003.765-3.764 3.766 3.766 0 00-3.765-3.765z",
  },
  vercel: {
    color: "#ffffff",
    viewBox: "0 0 24 24",
    path: "M24 22.525H0l12-21.05 12 21.05z",
  },
  render: {
    color: "#46E3B7",
    viewBox: "0 0 24 24",
    path: "M3.293 7.488a.977.977 0 010-1.38l4.59-4.59a.978.978 0 011.38 0l4.59 4.59a.975.975 0 010 1.38l-4.59 4.59a.977.977 0 01-1.38 0zM1.913 21.99l9.19-9.185 1.38 1.38-9.19 9.185zm9.185-9.185l9.185 9.185-1.38 1.38-9.185-9.185z",
  },
  xampp: {
    color: "#FB7A24",
    viewBox: "0 0 24 24",
    path: "M11.976.002C5.358.002 0 5.36 0 11.978s5.358 11.976 11.976 11.976 11.978-5.358 11.978-11.976S18.594.002 11.976.002zm5.702 15.908l-1.58 1.58-4.122-4.124-4.124 4.124-1.58-1.58 4.124-4.122-4.124-4.124 1.58-1.58 4.124 4.124 4.122-4.124 1.58 1.58-4.122 4.124z",
  },
  visualstudio: {
    color: "#5C2D91",
    viewBox: "0 0 24 24",
    path: "M17.583.063L9.297 8.35.84 5.656 0 6.437v11.125l.84.781 8.457-2.693 8.286 8.286L24 21.562V2.438zM1.862 16.722V7.278L7.453 12zm9.055-.601L4.917 12l6-4.121V11.5l-2.721 .5 2.721.5z",
  },
  vscode: {
    color: "#007ACC",
    viewBox: "0 0 24 24",
    path: "M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z",
  },
  intellij: {
    color: "#000000",
    viewBox: "0 0 24 24",
    path: "M0 0v24h24V0zm14.682 4.28h3.108v1.08h-1.968v.702h1.968v1.056h-1.968v.744h1.986v1.08H14.68zm-3.852.018h2.304c1.296 0 2.034.738 2.034 1.8 0 1.098-.774 1.854-2.07 1.854h-2.268V4.298zM5.124 8.76l-1.176-.534-.036-.054v-.018l1.176.552zM2.808 4.28h1.242l1.908 4.698H4.68l-.342-.906H2.7l-.342.906H1.08zm8.262 14.238H6.3v-.9h1.638v-5.754H6.3v-.9h4.77v.9H9.432v5.754H10.07zM12 19.656c-4.227 0-7.656-3.43-7.656-7.656S7.773 4.344 12 4.344 19.656 7.773 19.656 12 16.227 19.656 12 19.656zm3.636-2.148H11.88v-.9h1.314v-5.754H11.88v-.9h3.756v.9h-1.314v5.754H15.636z",
  },
  androidstudio: {
    color: "#3DDC84",
    viewBox: "0 0 24 24",
    path: "M12 0a12 12 0 110 24A12 12 0 0112 0zM9.147 7.31a.5.5 0 00-.5.5v.5h-.25a1.25 1.25 0 00-1.25 1.25v5a1.25 1.25 0 001.25 1.25h.25v.5a.5.5 0 001 0v-.5h4v.5a.5.5 0 001 0v-.5h.25a1.25 1.25 0 001.25-1.25v-5a1.25 1.25 0 00-1.25-1.25h-.25v-.5a.5.5 0 00-1 0v.5h-4v-.5a.5.5 0 00-.5-.5zm-.75 2.25h7v4.5h-7v-4.5zm1.25 1a.75.75 0 100 1.5.75.75 0 000-1.5zm4 0a.75.75 0 100 1.5.75.75 0 000-1.5zM8.5 5.5l-1 1.732h2L8.5 5.5zm7 0l-1 1.732h2L15.5 5.5z",
  },
  postman: {
    color: "#FF6C37",
    viewBox: "0 0 24 24",
    path: "M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643 4.453-4.453a.858.858 0 1 0-1.018-1.374l-4.705 4.705-.398-.397c-.963-.964-2.686-.236-2.652 1.12l.004.223c.017 1.022.068 2.977.068 2.977.023.235.143.48.405.736l3.116 3.116c.262.262.5.382.737.405 0 0 1.955.052 2.977.068l.225.003c1.357.034 2.085-1.689 1.12-2.653l-.398-.397 4.705-4.705a.858.858 0 0 0-1.373-1.019zm-6.838 8.356l-1.452-1.452-.068-2.325-.073-.31.492.49.308.307.793.794.068 2.325.073.31-.14-.139z",
  },
  docker: {
    color: "#2496ED",
    viewBox: "0 0 24 24",
    path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
  },
  phpmyadmin: {
    color: "#6C78AF",
    viewBox: "0 0 24 24",
    path: "M11.987 0C5.372 0 0 5.372 0 11.986c0 6.613 5.372 11.988 11.987 11.988 6.613 0 11.987-5.375 11.987-11.988C23.974 5.372 18.6 0 11.987 0zM9.36 15.388H7.975V9.504h-.012L6.298 15.388H5.19L3.525 9.504h-.012v5.884H2.127V8.006h2.137l1.444 5.377h.018l1.444-5.377H9.36zm5.255-3.36c0 .22-.018.427-.053.625a1.91 1.91 0 01-.19.565 1.71 1.71 0 01-.366.457 1.72 1.72 0 01-.596.317c-.245.079-.539.12-.882.12h-.87v1.877H11.21V8.006h1.932c.33 0 .618.042.864.126.247.084.456.204.627.358.172.157.302.344.393.565.09.222.137.468.14.736zm-.12 3.36h-1.2v-1.877h.87c.343 0 .636-.041.882-.12a1.72 1.72 0 00.596-.317c.153-.14.275-.28.366-.457a1.91 1.91 0 00.19-.565c.035-.198.053-.405.053-.625-.003-.268-.05-.514-.14-.736a1.44 1.44 0 00-.393-.565 1.62 1.62 0 00-.627-.358 2.49 2.49 0 00-.864-.126H12.36v7.382h1.444zm4.997 0h-1.444V8.006h1.432v3.067l2.304-3.067h1.756l-2.567 3.192 2.733 4.19h-1.733l-1.858-2.99-.623.783z",
  },
};

// Map display name → icon key
const SKILL_ICON_MAP: Record<string, string> = {
  Html: "html", HTML: "html",
  Css: "css", CSS: "css",
  JavaScript: "javascript",
  "React.js": "react", React: "react",
  "Tailwind CSS": "tailwindcss",
  "Windows Forms": "windowsforms",
  "Node.js": "nodejs",
  "Express.js": "express",
  "Java Spring Boot": "springboot",
  "C# / .NET 8": "csharp",
  PHP: "php", Php: "php",
  Java: "java",
  MongoDB: "mongodb", Mongodb: "mongodb",
  MySQL: "mysql", MySql: "mysql",
  SQLite: "sqlite",
  ".NET 8": "dotnet",
  "C#": "csharp",
  GitHub: "github",
  Figma: "figma",
  Vercel: "vercel",
  Render: "render",
  XAMPP: "xampp",
  "Visual Studio": "visualstudio",
  "IntelliJ IDEA": "intellij",
  Postman: "postman",
  Docker: "docker",
  "VS Code": "vscode",
  "Android Studio": "androidstudio",
  PHPMyAdmin: "phpmyadmin",
};

function TechIcon({ name, size = 16, className = "" }: { name: string; size?: number; className?: string }) {
  const key = SKILL_ICON_MAP[name];
  const icon = key ? TECH_ICONS[key] : null;
  if (!icon) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox ?? "0 0 24 24"}
      fill={icon.color}
      className={className}
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Forgotten Recipes",
    category: "Academic",
    description: "A MERN-based interactive platform to preserve, promote, and personalize Sri Lanka's ancient culinary heritage - with modern health tools and cultural storytelling.",
    stack: ["Mongodb", "Express.js", "React.js", "Node.js"],
    github: "https://github.com/madhukavirajith/Forgotten-Recipes.git",
    live: "https://forgotten-recipes.vercel.app/",
    media: "#",
    mediaType: "video",
  },
  {
    title: "Fitzone Fitness center",
    category: "Academic",
    description: "A simple fitness center website built with HTML, CSS, MySQL and PHP.",
    stack: ["Html", "Css", "Php", "MySQL"],
    github: "https://github.com/madhukavirajith/fitzone.git",
    live: "#",
    media: "#",
    mediaType: "video",
  },
  {
    title: "Luxevista Resort",
    category: "Academic",
    description: "A mobile app for a resort built with Java and MySQL, allowing users to book rooms, view amenities, and manage reservations.",
    stack: ["Java", "MySql"],
    github: "#",
    live: "#",
    media: "#",
    mediaType: "video",
  },
  {
    title: "Tutor Hub",
    category: "Personal",
    description: "A platform for connecting tutors and students, built with React for the frontend and Java Spring Boot for the backend, with MySQL for data storage.",
    stack: ["React", "Java Spring Boot", "MySQL"],
    github: "https://github.com/madhukavirajith/tutor-finder-frontend.git",
    live: "#",
    media: "#",
    mediaType: "video",
  },
  {
    title: "Leave Tracker Pro",
    category: "Personal",
    description: "A modern leave tracking desktop application built with C# and .NET, featuring a responsive UI and SQLite database integration.",
    stack: ["C#", ".NET 8", "SQLite", "Windows Forms"],
    github: "https://github.com/madhukavirajith/LeaveTrackerPro.git",
    live: "#",
    media: "#",
    mediaType: "video",
  },
];

const skills = {
  frontend: ["Html", "Css", "JavaScript", "React.js", "Tailwind CSS", "Windows Forms"],
  backend: ["Node.js", "Express.js", "Java Spring Boot", "C# / .NET 8", "PHP"],
  database: ["MongoDB", "MySQL", "SQLite"],
  tools: ["GitHub", "Figma", "Vercel", "Render", "XAMPP", "Visual Studio", "IntelliJ IDEA", "Postman", "Docker", "VS Code", "Android Studio", "PHPMyAdmin"],
};

const experiences = [
  {
    title: "BSc (Hons) Computer Software Engineering",
    org: "Cardiff Metropolitan University",
    period: "Nov 2025 — Present",
    desc: "Currently pursuing a bachelor's degree in Computer Software Engineering with a focus on software development, programming, and modern engineering practices.",
  },
  {
    title: "Higher Diploma in Computing and Software Engineering",
    org: "Cardiff Metropolitan University",
    period: "Jan 2024 — Nov 2025",
    desc: "Completed the Higher Diploma with Merit",
  },
];

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

// ─── Shared Components ────────────────────────────────────────────────────────

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-300">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
    </div>
  );
}

// Chip WITH icon (for project stacks & skills)
function SkillChip({ name }: { name: string }) {
  const hasIcon = !!SKILL_ICON_MAP[name];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 backdrop-blur-sm">
      {hasIcon && <TechIcon name={name} size={14} />}
      {name}
    </span>
  );
}

// Project Media Component
function ProjectMedia({ project, theme }: { project: any; theme: any }) {
  const [mediaError, setMediaError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!project.media || project.media === "#" || mediaError) {
    return (
      <div className="h-56 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-fuchsia-500/20 flex items-center justify-center">
        <div className="text-center">
          <Code2 className="h-10 w-10 text-cyan-400/50 mx-auto mb-2" />
          <p className="text-sm text-slate-400">{project.title}</p>
        </div>
      </div>
    );
  }

  if (project.mediaType === "video" || project.media.endsWith(".mp4") || project.media.endsWith(".webm")) {
    return (
      <div
        className="relative h-56 overflow-hidden bg-black/40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          poster={project.poster}
          onError={() => setMediaError(true)}
        >
          <source src={project.media} type={`video/${project.media.endsWith(".webm") ? "webm" : "mp4"}`} />
        </video>
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300">
            <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm">
              <ExternalLink className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-56 overflow-hidden bg-black/40">
      <img
        src={project.media}
        alt={project.title}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={() => setMediaError(true)}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MadhukaPortfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const theme = darkMode
    ? {
        bg: "bg-[#030712]",
        panel: "bg-white/5",
        card: "bg-white/5",
        text: "text-slate-100",
        sub: "text-slate-300",
        border: "border-white/10",
      }
    : {
        bg: "bg-slate-100",
        panel: "bg-white/80",
        card: "bg-white/80",
        text: "text-slate-900",
        sub: "text-slate-600",
        border: "border-slate-200",
      };

  return (
    <div className={`${theme.bg} min-h-screen overflow-x-hidden transition-colors duration-300`}>
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className={`text-lg font-semibold ${theme.text}`}>
            Madhuka<span className="text-cyan-400">.</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm transition hover:text-cyan-400 ${theme.sub}`}>
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`rounded-full border ${theme.border} ${theme.panel} p-2 ${theme.text}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`rounded-full border ${theme.border} ${theme.panel} p-2 md:hidden ${theme.text}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className={`${theme.sub} transition hover:text-cyan-400`}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="home" className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                <Sparkles className="h-4 w-4" />
                Available for internships and graduate opportunities
              </div>
              <h1 className={`max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl ${theme.text}`}>
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Madhuka Virajith
                </span>
              </h1>
              <p className={`mt-6 max-w-2xl text-lg leading-8 ${theme.sub}`}>
                Final Year Software Engineering Undergraduate building elegant, scalable, and high-performance digital products. I create modern full-stack applications with strong focus on user experience, clean architecture, and real-world impact.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {["Full-Stack Developer", "UI-Focused Engineer", "Problem Solver"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">
                  View Projects <ChevronRight className="h-4 w-4" />
                </a>
                <a href="#contact" className={`inline-flex items-center gap-2 rounded-2xl border ${theme.border} ${theme.panel} px-6 py-3 font-semibold ${theme.text} transition hover:scale-[1.02]`}>
                  Contact Me
                </a>
                <a href="/Madhuka-Virajith-CV.pdf" className={`inline-flex items-center gap-2 rounded-2xl border ${theme.border} ${theme.panel} px-6 py-3 font-semibold ${theme.text}`}>
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </div>
              <div className="mt-10 flex items-center gap-4">
                {[
                  { href: "https://github.com/madhukavirajith", icon: <Github className="h-5 w-5" /> },
                  { href: "https://www.linkedin.com/in/madhuka-virajith-599ba42a4/", icon: <Linkedin className="h-5 w-5" /> },
                  { href: "mailto:madvira99@gmail.com", icon: <Mail className="h-5 w-5" /> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`rounded-2xl border ${theme.border} ${theme.panel} p-3 ${theme.text}`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
              <div className={`relative overflow-hidden rounded-[32px] border ${theme.border} ${theme.panel} p-6 shadow-2xl`}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${theme.sub}`}>Profile Snapshot</p>
                    <h3 className={`mt-1 text-xl font-semibold ${theme.text}`}>Software Engineer Portfolio</h3>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 p-3 text-slate-950">
                    <Code2 className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: <Layers3 className="h-5 w-5" />, color: "bg-cyan-400/10 text-cyan-300", title: "Frontend Engineering", sub: "Responsive, animated, modern interfaces" },
                    { icon: <Server className="h-5 w-5" />, color: "bg-fuchsia-400/10 text-fuchsia-300", title: "Backend Development", sub: "APIs, authentication, databases, deployment" },
                    { icon: <Database className="h-5 w-5" />, color: "bg-blue-400/10 text-blue-300", title: "System Thinking", sub: "Clean architecture and scalable solutions" },
                  ].map((card) => (
                    <div key={card.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-2xl ${card.color} p-3`}>{card.icon}</div>
                        <div>
                          <p className={`font-medium ${theme.text}`}>{card.title}</p>
                          <p className={`text-sm ${theme.sub}`}>{card.sub}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionTitle
            eyebrow="About Me"
            title="Designing software experiences that feel polished and purposeful"
            description="I am a final year software engineering undergraduate passionate about creating web applications that are not only functional, but also visually engaging and user-friendly. I enjoy transforming ideas into production-ready products using modern frameworks and thoughtful engineering practices."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: <User className="h-5 w-5" />, title: "Who I Am", text: "A software engineering undergraduate focused on building clean, modern, and impactful digital products." },
              { icon: <Briefcase className="h-5 w-5" />, title: "What I Build", text: "Full-stack systems, dashboards, portfolio sites, academic tools, and user-centered web applications." },
              { icon: <GraduationCap className="h-5 w-5" />, title: "What I Value", text: "Strong UI, maintainable code, performance, scalability, and solving practical real-world problems." },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-[28px] border ${theme.border} ${theme.card} p-6 backdrop-blur-xl`}>
                <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 p-3 text-cyan-300">{item.icon}</div>
                <h3 className={`text-lg font-semibold ${theme.text}`}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${theme.sub}`}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionTitle
            eyebrow="Skills"
            title="My technical toolkit"
            description="These are the technologies and tools I use to plan, build, deploy, and improve modern software products."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Frontend", icon: <Globe className="h-5 w-5" />, values: skills.frontend },
              { title: "Backend", icon: <Server className="h-5 w-5" />, values: skills.backend },
              { title: "Database", icon: <Database className="h-5 w-5" />, values: skills.database },
              { title: "Tools", icon: <Code2 className="h-5 w-5" />, values: skills.tools },
            ].map((group) => (
              <div key={group.title} className={`rounded-[28px] border ${theme.border} ${theme.card} p-6`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">{group.icon}</div>
                  <h3 className={`text-lg font-semibold ${theme.text}`}>{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.values.map((skill) => (
                    <SkillChip key={skill} name={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionTitle
            eyebrow="Projects"
            title="Selected work that reflects my engineering approach"
            description="A curated set of projects demonstrating full-stack development, polished design, and practical problem solving."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {["All", "Real World", "Academic", "Personal"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter ? "bg-cyan-400 text-slate-950" : `${theme.panel} ${theme.text} border ${theme.border}`
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group rounded-[30px] border ${theme.border} ${theme.card} overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
              >
                <ProjectMedia project={project} theme={theme} />
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-cyan-300">{project.category}</p>
                      <h3 className={`mt-1 text-xl font-semibold ${theme.text}`}>{project.title}</h3>
                    </div>
                  </div>
                  <p className={`text-sm leading-7 ${theme.sub}`}>{project.description}</p>

                  {/* Stack chips WITH icons */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <SkillChip key={item} name={item} />
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={project.github} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-2xl border ${theme.border} px-4 py-2 ${theme.text} hover:bg-white/10 transition`}>
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                    <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-300 transition">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionTitle
            eyebrow="Experience & Education"
            title="My journey so far"
            description="A quick overview of my education, project work, and software development growth."
          />
          <div className="mt-12 space-y-6">
            {experiences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-[28px] border ${theme.border} ${theme.card} p-6`}
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h3 className={`text-xl font-semibold ${theme.text}`}>{item.title}</h3>
                    <p className="mt-1 text-cyan-300">{item.org}</p>
                    <p className={`mt-4 max-w-3xl text-sm leading-7 ${theme.sub}`}>{item.desc}</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">{item.period}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className={`rounded-[36px] border ${theme.border} ${theme.card} p-8 sm:p-10`}>
            <SectionTitle
              eyebrow="Contact"
              title="Let's build something meaningful"
              description="I'm open to internships, graduate roles, freelance work, and exciting software collaborations. Feel free to reach out."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { label: "Email", value: "madvira99@gmail.com", href: "mailto:madvira99@gmail.com", icon: <Mail className="h-5 w-5" /> },
                { label: "GitHub", value: "github.com/madhukavirajith", href: "https://github.com/madhukavirajith", icon: <Github className="h-5 w-5" /> },
                { label: "LinkedIn", value: "linkedin.com/in/madhuka-virajith-599ba42a4/", href: "https://www.linkedin.com/in/madhuka-virajith-599ba42a4/", icon: <Linkedin className="h-5 w-5" /> },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className={`rounded-[28px] border ${theme.border} ${theme.panel} p-6 transition hover:-translate-y-1`}>
                  <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">{item.icon}</div>
                  <p className={`text-sm ${theme.sub}`}>{item.label}</p>
                  <p className={`mt-2 break-all font-medium ${theme.text}`}>{item.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className={`${theme.sub} text-sm`}>
            © {new Date().getFullYear()} Madhuka Virajith. Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
          <p className="text-sm text-cyan-300">madhukavirajith.com</p>
        </div>
      </footer>
    </div>
  );
}