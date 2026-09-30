"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  User,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Layers3,
  Terminal,
  Send,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  Bot,
  BrainCircuit,
  Cpu,
  Database,
  Calendar,
  Globe,
  Check,
  Copy,
} from "lucide-react";

// ─── Tech Icon SVG Paths ──────────────────────────────────────────────────────
const TECH_ICONS: Record<string, { path: string; color: string; viewBox?: string }> = {
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
  python: {
    color: "#3776AB",
    viewBox: "0 0 24 24",
    path: "M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.81v.825H3.94S0 5.765 0 11.879c0 6.112 3.447 5.897 3.447 5.897h2.057v-2.884s-.112-3.447 3.39-3.447h5.795v-.844h-5.81V7.75h8.995s3.15.358 3.15-5.094C21.024.218 17.514 0 11.914 0zm-1.748 1.688a1.002 1.002 0 1 1 0 2.004 1.002 1.002 0 0 1 0-2.004zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75h-5.81v-.825h8.076s3.94.466 3.94-5.648c0-6.112-3.447-5.897-3.447-5.897h-2.057v2.884s.112 3.447-3.39 3.447H9.31v.844h5.81v2.75H6.125s-3.15-.358-3.15 5.094C2.975 23.782 6.486 24 12.086 24zm1.748-1.688a1.002 1.002 0 1 1 0-2.004 1.002 1.002 0 0 1 0 2.004z",
  },
  react: {
    color: "#61DAFB",
    viewBox: "0 0 24 24",
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565z",
  },
  tailwindcss: {
    color: "#06B6D4",
    viewBox: "0 0 24 24",
    path: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z",
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
  java: {
    color: "#007396",
    viewBox: "0 0 24 24",
    path: "M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 .001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639",
  },
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
  github: {
    color: "#ffffff",
    viewBox: "0 0 24 24",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  docker: {
    color: "#2496ED",
    viewBox: "0 0 24 24",
    path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
  },
  php: {
    color: "#777BB4",
    viewBox: "0 0 24 24",
    path: "M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 01-.305.847 2.809 2.809 0 01-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.624H9.388l1.23-6.326h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944H12.764zm7.203-4.272l-1.23 6.326h-1.316l.122-.641c-.285.25-.59.434-.917.551a2.8 2.8 0 01-.96.164c-.609 0-1.066-.196-1.37-.589-.305-.393-.38-.944-.224-1.652l.612-3.159h1.382l-.571 2.924c-.082.422-.058.731.069.93.127.198.351.297.672.297.341 0 .636-.107.887-.322.251-.215.422-.54.513-.976l.548-2.853 1.383.0z",
  },
  nodejs: {
    color: "#339933",
    viewBox: "0 0 24 24",
    path: "M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242L11.13 1.604a.271.271 0 0 0-.271 0L2.073 6.68c-.085.05-.139.146-.139.241v10.15c0 .097.054.189.139.235l2.409 1.391c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.019c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.226 18.439a1.847 1.847 0 0 1-.92-1.597V6.921c0-.659.353-1.272.92-1.599L9.019.247a1.886 1.886 0 0 1 1.866 0l7.793 4.075c.567.328.92.94.92 1.599v10.15c0 .659-.353 1.271-.92 1.597l-7.793 4.085c-.28.163-.6.247-.887.247zm2.42-6.993c-3.855 0-4.663-1.77-4.663-3.255 0-.142.114-.253.256-.253h1.138c.127 0 .233.092.252.217.172 1.161.684 1.748 3.017 1.748 1.857 0 2.646-.420 2.646-1.405 0-.568-.226-.991-3.119-1.274-2.418-.239-3.912-.773-3.912-2.708 0-1.783 1.503-2.846 4.024-2.846 2.829 0 4.231.982 4.408 3.091a.255.255 0 0 1-.065.196.257.257 0 0 1-.189.083H16.09a.256.256 0 0 1-.248-.196c-.276-1.222-.946-1.614-2.776-1.614-2.044 0-2.283.712-2.283 1.247 0 .648.28.836 3.023 1.202 2.717.362 4.008.877 4.008 2.769-.001 1.925-1.605 3.002-4.396 3.002z",
  },
  express: {
    color: "#808080",
    viewBox: "0 0 24 24",
    path: "M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.138-.82zm1.158-.228c-.48 0-1.907 0-2.84 0 .18-3.797 3.018-6.702 6.403-5.362 1.48.576 2.338 1.72 2.658 3.241a.66.66 0 01-.158.44H1.16z",
  },
};

const SKILL_ICON_MAP: Record<string, string> = {
  Java: "java", "Java 17": "java", "Spring Boot": "springboot", "Spring AI": "springboot", "Spring Security": "springboot",
  Python: "python", JavaScript: "javascript", React: "react", "React.js": "react",
  "Tailwind CSS": "tailwindcss", "C#": "csharp", ".NET 8": "dotnet",
  PHP: "php", MongoDB: "mongodb", MySQL: "mysql", SQLite: "sqlite",
  Docker: "docker", "Node.js": "nodejs", "Express.js": "express",
  HTML: "html", HTML5: "html", CSS: "css", CSS3: "css", GitHub: "github", "Git/GitHub": "github"
};

// ─── 3D Particle Globe ────────────────────────────────────────────────────────
function ParticleGlobe({ darkMode }: { darkMode: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = 300;
    const height = 180;
    canvas.width = width;
    canvas.height = height;

    const radius = 68;
    const particleCount = 75;
    const focalLength = 150;

    interface Particle {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        px: 0,
        py: 0,
      });
    }

    let targetVx = 0.002;
    let targetVy = 0.003;
    let vx = 0.002;
    let vy = 0.003;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      targetVy = (mx / rect.width) * 0.035;
      targetVx = -(my / rect.height) * 0.035;
    };

    const handleMouseLeave = () => {
      targetVx = 0.002;
      targetVy = 0.003;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      vx += (targetVx - vx) * 0.08;
      vy += (targetVy - vy) * 0.08;

      const cosY = Math.cos(vy);
      const sinY = Math.sin(vy);
      const cosX = Math.cos(vx);
      const sinX = Math.sin(vx);

      particles.forEach((p) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;

        const scale = focalLength / (focalLength + z2);
        p.px = x1 * scale + width / 2;
        p.py = y2 * scale + height / 2;
      });

      ctx.clearRect(0, 0, width, height);

      // Web connections
      ctx.strokeStyle = darkMode ? "rgba(6, 182, 212, 0.08)" : "rgba(139, 92, 246, 0.08)";
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 42) {
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      particles.forEach((p) => {
        const depthOpacity = (p.z + radius) / (radius * 2);
        const opacity = 0.15 + depthOpacity * 0.85;
        ctx.fillStyle = darkMode
          ? `rgba(6, 182, 212, ${opacity})`
          : `rgba(139, 92, 246, ${opacity})`;

        const size = depthOpacity * 1.8 + 1.2;
        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-grab active:cursor-grabbing max-w-full"
      style={{ display: "block", margin: "0 auto" }}
    />
  );
}

function TechIcon({ name, size = 15, className = "" }: { name: string; size?: number; className?: string }) {
  const key = SKILL_ICON_MAP[name];
  const icon = key ? TECH_ICONS[key] : null;
  if (!icon) {
    return <Code2 className={`inline-block ${className}`} style={{ width: size, height: size }} />;
  }
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

// ─── Complete 8 Projects from CV ─────────────────────────────────────────────
interface ProjectItem {
  id: string;
  title: string;
  category: "Personal" | "Academic";
  domain: string;
  period: string;
  stack: string[];
  github: string;
  live?: string;
  image: string;
  bullets: string[];
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "tutor-finder",
    title: "Tutor Finder - AI Powered Tutor Booking & Recommendation Platform",
    category: "Personal",
    domain: "Full-Stack & AI",
    period: "Feb 2026 - Jul 2026",
    stack: ["Java", "Spring Boot", "Spring AI", "Spring Security", "React", "Tailwind CSS", "Google Gemini API"],
    github: "https://github.com/madhukavirajith/tutor-finder-frontend",
    live: "https://tutor-finder-frontend.vercel.app",
    image: "/projects/tutor-finder.png",
    bullets: [
      "Implemented a custom Trie with Depth-First Search in Java for real-time, case-insensitive subject autocomplete.",
      "Designed a hybrid recommendation engine using a Max-Heap (PriorityQueue) to rank the top K tutors in O(K log N) time, with Levenshtein Distance for fuzzy search.",
      "Integrated a context-aware AI chatbot (Spring AI + Google Gemini) with topic guardrails; secured the platform with JWT/Spring Security role-based access for students, tutors, and admins.",
    ],
  },
  {
    id: "leave-tracker-pro",
    title: "LeaveTrackerPro - Desktop Employee Leave Management System",
    category: "Personal",
    domain: "Desktop Software",
    period: "Jan 2026 - Jun 2026",
    stack: ["C#", ".NET 8", "Windows Forms", "SQLite"],
    github: "https://github.com/madhukavirajith/LeaveTrackerPro",
    image: "/projects/leave.png",
    bullets: [
      "Built an enterprise-style desktop app supporting leave requests, manager approvals, and admin policy management with immutable audit logs.",
      "Implemented leave-balance tracking across 6 leave types, a team-availability calendar, Excel export for HR reporting, and BCrypt password hashing.",
    ],
  },
  {
    id: "mars-pressure-predictor",
    title: "MEDA Mars Atmospheric Pressure Predictor - Virtual Sensor Recovery for NASA Perseverance",
    category: "Academic",
    domain: "AI / Machine Learning",
    period: "Jun 2026 - Aug 2026",
    stack: ["Python", "Streamlit", "XGBoost", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    github: "https://github.com/madhukavirajith/mars-pressure-predictor",
    live: "https://mars-pressure-predictor.streamlit.app",
    image: "/projects/mars.png",
    bullets: [
      "Built an ML web app that reconstructs Martian atmospheric pressure from 23 correlated MEDA telemetry channels (temperature, humidity, solar irradiance, rover kinematics) from NASA’s Perseverance Rover at Jezero Crater.",
      "Trained and serialised an XGBoost regression model with a scikit-learn imputation pipeline to handle missing sensor data in real time, enabling virtual recovery of a failed pressure transducer.",
      "Built an interactive Streamlit dashboard with preset mission scenarios and a zoned pressure gauge; deployed on Streamlit Cloud with cached model loading for low-latency inference.",
    ],
  },
  {
    id: "carbon-wise-sl",
    title: "CarbonWise SL - AI Powered Household Carbon Prediction & Reduction Platform",
    category: "Academic",
    domain: "Full-Stack & AI",
    period: "Apr 2026 - Present",
    stack: ["React.js", "FastAPI", "Python", "Docker", "Firebase", "XGBoost", "SHAP"],
    github: "https://github.com/madhukavirajith/CarbonWiseSL",
    live: "https://carbon-wise-sl.vercel.app",
    image: "/projects/carbonwise.png",
    bullets: [
      "Built an XGBoost regression model to predict household daily carbon emissions, with SHAP TreeExplainer for per-appliance explainability.",
      "Applied K-Means clustering to segment consumption patterns and generate personalised energy-reduction recommendations.",
      "Developed a Solar ROI calculator forecasting installation cost, payback period, and lifetime carbon offset from regional irradiance data.",
    ],
  },
  {
    id: "sunrise-dental",
    title: "Sunrise Dental Clinic - Appointment & Patient Management System",
    category: "Academic",
    domain: "Enterprise Web App",
    period: "Jul 2025 - Sep 2025",
    stack: ["Java 17", "Jakarta EE", "Servlets & JSP", "MySQL", "Maven", "JUnit 5", "GitHub Actions"],
    github: "https://github.com/madhukavirajith/sunrise-dental-clinic-system",
    image: "/projects/sunrise.png",
    bullets: [
      "Engineered a 3-tier Java EE web application with no third-party frameworks, applying DAO, Singleton, Strategy, and Observer patterns to separate presentation, business logic, and data access.",
      "Used Strategy for treatment-dependent billing and Observer for a simulated Email/SMS notification system with a full audit trail.",
      "Secured the app with PBKDF2-salted password hashing and a servlet-filter session check, and exposed a hand-built REST-style JSON endpoint.",
      "Implemented stored procedures, functions, and triggers (e.g. double-booking prevention); wrote 65 unit, integration, and boundary-value tests with CI via GitHub Actions.",
    ],
  },
  {
    id: "forgotten-recipes",
    title: "Forgotten Recipes - MERN-Stack Heritage Culinary Platform",
    category: "Academic",
    domain: "Full-Stack Web",
    period: "Jun 2025 - Aug 2025",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Socket.IO"],
    github: "https://github.com/madhukavirajith/Forgotten-Recipes",
    live: "https://forgotten-recipes.vercel.app",
    image: "/projects/forgotten-recipes.png",
    bullets: [
      "Led a team of 6 as Product Owner and Scrum Master, running Agile sprint planning and backlog management to deliver a full-stack MERN application.",
      "Built real-time chat between home cooks and chefs with Socket.IO, and a nutrition visualiser with macro/micro-nutrient radar charts.",
      "Secured the platform with JWT/Bcrypt authentication, Helmet security headers, and Express rate limiting.",
    ],
  },
  {
    id: "fitzone",
    title: "FitZone Fitness Center Portal - Booking & Management System",
    category: "Academic",
    domain: "Full-Stack Web",
    period: "Feb 2025 - Apr 2025",
    stack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Docker"],
    github: "https://github.com/madhukavirajith/fitzone",
    live: "https://fitzone-0sp0.onrender.com",
    image: "/projects/fitzone.png",
    bullets: [
      "Built a secure PHP backend with session-based authentication and parameterised SQL queries to prevent SQL injection, backed by a relational MySQL schema.",
      "Designed separate customer and staff/admin dashboards for bookings, inquiries, and appointment logs.",
      "Containerised the stack with Docker Compose and deployed it on Render with a cloud-hosted database on Clever Cloud.",
    ],
  },
  {
    id: "luxevista",
    title: "Luxe Vista Resort - Android Hotel Management System",
    category: "Academic",
    domain: "Mobile Application",
    period: "Feb 2025 - Apr 2025",
    stack: ["Java", "Android SDK", "SQLite"],
    github: "https://github.com/madhukavirajith/LuxeVistaResort",
    image: "/projects/luxevista.png",
    bullets: [
      "Architected the app with MVVM and applied the Singleton pattern to manage a single shared database connection.",
      "Used RecyclerView with background data processing to keep large room/service lists responsive, and Glide for efficient image loading.",
      "Built local storage for offline-reliable user profiles and reservation history.",
    ],
  },
];

// ─── Skills Grouping based on CV ─────────────────────────────────────────────
const SKILL_CATEGORIES = {
  core: [
    { name: "Java", level: "Advanced", desc: "Java 17, Jakarta EE, OOP, Spring Boot" },
    { name: "Python", level: "Advanced", desc: "Data Science, XGBoost, FastAPI, Streamlit" },
    { name: "JavaScript", level: "Advanced", desc: "Modern ES6+, Node.js, Express, Socket.IO" },
    { name: "React", level: "Advanced", desc: "React.js, Next.js, Hooks, State Architecture" },
    { name: "SQL", level: "Advanced", desc: "MySQL, SQLite, Stored Procedures, Triggers" },
    { name: "Data Structures & Algorithms", level: "Proficient", desc: "Trie, DFS, Max-Heap, Levenshtein" },
    { name: "OOP", level: "Advanced", desc: "DAO, Singleton, Strategy, Observer, MVVM" },
    { name: "Git/GitHub", level: "Advanced", desc: "CI/CD via GitHub Actions, Branching, PRs" },
  ],
  aiml: [
    { name: "XGBoost", level: "Advanced", desc: "Regression & Telemetry Reconstruction" },
    { name: "scikit-learn", level: "Proficient", desc: "Imputation Pipelines, Model Evaluation" },
    { name: "SHAP", level: "Proficient", desc: "TreeExplainer per-feature explainability" },
    { name: "K-Means Clustering", level: "Proficient", desc: "Consumption pattern segmentation" },
    { name: "Google Gemini API", level: "Advanced", desc: "Context-aware AI with topic guardrails" },
    { name: "Spring AI", level: "Proficient", desc: "LLM integration in Java Enterprise" },
    { name: "Pandas & NumPy", level: "Advanced", desc: "Multi-channel sensor data manipulation" },
    { name: "Matplotlib", level: "Proficient", desc: "Statistical visualization & radar charts" },
  ],
  frameworks: [
    { name: "Spring Boot", level: "Advanced", desc: "Spring Security, REST APIs, Maven" },
    { name: "FastAPI", level: "Proficient", desc: "High-performance Python microservices" },
    { name: "Express.js", level: "Advanced", desc: "Node.js REST backend, middleware, security" },
    { name: "C# / .NET 8", level: "Proficient", desc: "Desktop systems, Windows Forms" },
    { name: "Android SDK", level: "Proficient", desc: "Java, MVVM, RecyclerView, Glide" },
    { name: "Jakarta EE", level: "Proficient", desc: "Servlets, JSP, JSTL, Filter Session Checks" },
    { name: "Tailwind CSS", level: "Advanced", desc: "Modern responsive design systems" },
    { name: "Socket.IO", level: "Proficient", desc: "Real-time bidirectional event streaming" },
  ],
  cloud: [
    { name: "Docker", level: "Proficient", desc: "Containerization, Docker Compose" },
    { name: "Firebase", level: "Proficient", desc: "NoSQL cloud storage & authentication" },
    { name: "MongoDB", level: "Advanced", desc: "Document modeling, aggregation pipelines" },
    { name: "Streamlit Cloud", level: "Advanced", desc: "Interactive ML dashboard deployment" },
    { name: "Render & Clever Cloud", level: "Proficient", desc: "Cloud app hosting & MySQL hosting" },
    { name: "Vercel", level: "Advanced", desc: "Next.js & React frontend deployments" },
    { name: "Maven & JUnit 5", level: "Advanced", desc: "65+ unit, integration, boundary tests" },
    { name: "GitHub Actions", level: "Proficient", desc: "Automated test runs & CI pipelines" },
  ],
};

// ─── Professional Experience & Education from CV ──────────────────────────────
const PROFESSIONAL_EXPERIENCES = [
  {
    role: "Data Annotator",
    company: "Innodata Inc.",
    period: "Jan 2026 - Jun 2026",
    description:
      "Labelled data to strict quality guidelines for a Superintelligence Lab annotation project supporting large-scale AI model training, maintaining high accuracy under time-sensitive targets.",
    badge: "AI Model Training",
  },
  {
    role: "Data Annotator",
    company: "IFG BPO (Pvt.) Ltd.",
    period: "Oct 2025 - Mar 2026",
    description:
      "Processed and analysed urban data for the Greehill project, collaborating with a remote team to meet deadlines with consistent quality.",
    badge: "Urban Data Processing",
  },
];

const EDUCATION_ITEMS = [
  {
    degree: "BSc (Hons) Computer Software Engineering",
    institution: "Cardiff Metropolitan University",
    period: "Nov 2025 - Present",
    details:
      "Key modules: Advanced Programming, Analytics and Business Intelligence, Computational Intelligence, Professional and Ethical Issues in IT, Development Project.",
    badge: "In Progress",
  },
  {
    degree: "Higher Diploma, Computing & Software Engineering",
    institution: "Cardiff Metropolitan University",
    period: "Jan 2024 - Nov 2025",
    grade: "Grade: Merit",
    details:
      "Key modules: Data Structures & Algorithms, OOP, Database Design & Development, Web & Mobile Application Development, Service-Oriented Computing, System Analysis and Design, Computer Networks, Project Management.",
    badge: "Merit Distinction",
  },
];

const CERTIFICATIONS = [
  {
    name: "Google AI Essentials Specialization",
    issuer: "Google",
    date: "Dec 2025",
    credentialId: "CRVK7DM1HRYO",
    details: "Foundational AI principles, generative AI tools, prompt design strategies, and responsible AI practices.",
  },
  {
    name: "Java Programming for Beginners",
    issuer: "IBM",
    date: "Sep 2025",
    credentialId: "QKQ28D53HMVA",
    details: "Core Java programming syntax, OOP class hierarchies, interface implementations, and algorithmic debugging.",
  },
];

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Terminal", href: "#terminal" },
  { name: "Contact", href: "#contact" },
];

export default function MadhukaPortfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"All" | "Personal" | "Academic" | "AI/ML">("All");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Rotating roles typing effect
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const titles = useMemo(
    () => [
      "Software Engineering Undergraduate",
      "Full-Stack & AI/ML Developer",
      "Java & Spring Boot Engineer",
      "Python & Machine Learning Specialist",
      "C# & .NET Desktop Developer",
    ],
    []
  );

  // Skill Tabs
  const [activeSkillCategory, setActiveSkillCategory] = useState<keyof typeof SKILL_CATEGORIES>("core");

  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Madhuka Virajith Portfolio OS [Version 2.0.0]",
    "Software Engineering Undergraduate • Full-Stack & AI/ML Development",
    "Type 'help' to inspect credentials, projects, or background.",
    "",
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  // Resume Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! I am Madhuka Virajith's CV assistant. I can answer any questions about his 8 software projects, AI/ML models, technical skills, Innodata experience, or Cardiff Met education. How can I help?",
    },
  ]);
  const [chatTyping, setChatTyping] = useState(false);
  const chatbotMessagesEndRef = useRef<HTMLDivElement>(null);

  // Contact Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 35);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex, titles]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  useEffect(() => {
    if (!hasMounted.current) return;
    chatbotMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatTyping]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return ALL_PROJECTS;
    if (activeFilter === "Personal") return ALL_PROJECTS.filter((p) => p.category === "Personal");
    if (activeFilter === "Academic") return ALL_PROJECTS.filter((p) => p.category === "Academic");
    if (activeFilter === "AI/ML") return ALL_PROJECTS.filter((p) => p.domain.includes("AI") || p.domain.includes("Machine Learning"));
    return ALL_PROJECTS;
  }, [activeFilter]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      setTimeout(() => setFormStatus("idle"), 6000);
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("virajith404@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Terminal commands interpreter matching CV
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, `guest@madhukavirajith:~$ ${terminalInput}`];

    switch (cmd) {
      case "help":
        newHistory.push(
          "Available Commands:",
          "  about          - Overview and summary from Madhuka's CV",
          "  skills         - View technical skills and proficiencies",
          "  projects       - List all 8 full-stack, AI/ML, desktop & mobile applications",
          "  experience     - Display professional experience (Innodata & IFG BPO)",
          "  education      - View Cardiff Metropolitan University degrees and Merit grade",
          "  certifications - View Google AI & IBM Java certifications",
          "  contact        - Output phone, email, location & social links",
          "  clear          - Clear terminal output",
          "  sudo coffee    - Compile developer espresso boost"
        );
        break;
      case "about":
        newHistory.push(
          "MADHUKA VIRAJITH",
          "Software Engineering Undergraduate | Full-Stack & AI/ML Development",
          "Colombo, Sri Lanka | virajith404@gmail.com | +94 70 241 2807",
          "",
          "SUMMARY:",
          "Software Engineering undergraduate at Cardiff Metropolitan University (BSc Hons in progress;",
          "Higher Diploma completed with Merit) with hands-on experience building eight full-stack, web,",
          "AI/ML, desktop, and mobile applications, applying knowledge to real performance problems.",
          "Seeking a Software Engineering internship to contribute to the industry."
        );
        break;
      case "skills":
        newHistory.push(
          "TECHNICAL SKILLS (From CV):",
          "• Core Languages: Java (Java 17, Jakarta EE), Python, JavaScript, C#, PHP, SQL, HTML5, CSS3",
          "• AI & Machine Learning: XGBoost, scikit-learn, SHAP, K-Means Clustering, Google Gemini API, Spring AI",
          "• Frameworks & Web: Spring Boot, Spring Security, React.js, FastAPI, Node.js, Express.js, .NET 8, Android SDK, Socket.IO",
          "• Databases: MySQL, SQLite, MongoDB, Firebase",
          "• Tools & DevOps: Git/GitHub, GitHub Actions, Docker, Docker Compose, Maven, JUnit 5, Postman, Streamlit Cloud"
        );
        break;
      case "projects":
        newHistory.push(
          "ALL 8 FEATURED PROJECTS:",
          "1. Tutor Finder - AI Powered Tutor Booking & Recommendation Platform (Spring Boot, Gemini API, React)",
          "2. LeaveTrackerPro - Desktop Employee Leave Management System (C#, .NET 8, WinForms, SQLite)",
          "3. MEDA Mars Atmospheric Pressure Predictor - NASA Perseverance Sensor Recovery (Python, Streamlit, XGBoost)",
          "4. CarbonWise SL - AI Powered Household Carbon Prediction & Reduction (React, FastAPI, XGBoost, SHAP)",
          "5. Sunrise Dental Clinic - Appointment & Patient Management (Java 17, Jakarta EE, 3-tier, 65 Tests)",
          "6. Forgotten Recipes - MERN-Stack Heritage Culinary Platform (Scrum Master, Socket.IO, Bcrypt, Helmet)",
          "7. FitZone Fitness Center Portal - Booking & Management System (PHP, MySQL, Docker, Render)",
          "8. Luxe Vista Resort - Android Hotel Management System (Java, Android SDK, MVVM, SQLite)"
        );
        break;
      case "experience":
        newHistory.push(
          "PROFESSIONAL EXPERIENCE:",
          "• Data Annotator - Innodata Inc. (Jan 2026 - Jun 2026)",
          "  Labelled data to strict quality guidelines for a Superintelligence Lab annotation project supporting large-scale AI model training, maintaining high accuracy under time-sensitive targets.",
          "",
          "• Data Annotator - IFG BPO (Pvt.) Ltd. (Oct 2025 - Mar 2026)",
          "  Processed and analysed urban data for the Greehill project, collaborating with a remote team to meet deadlines with consistent quality."
        );
        break;
      case "education":
        newHistory.push(
          "EDUCATION:",
          "• BSc (Hons) Computer Software Engineering - Cardiff Metropolitan University (Nov 2025 - Present)",
          "  Key modules: Advanced Programming, Analytics and Business Intelligence, Computational Intelligence, Professional and Ethical Issues in IT, Development Project",
          "",
          "• Higher Diploma, Computing & Software Engineering - Cardiff Metropolitan University (Jan 2024 - Nov 2025)",
          "  Grade: Merit",
          "  Key modules: Data Structures & Algorithms, OOP, Database Design & Development, Web & Mobile App Development, Service-Oriented Computing, System Analysis & Design, Networks, Project Management"
        );
        break;
      case "certifications":
        newHistory.push(
          "CERTIFICATIONS:",
          "• Google AI Essentials Specialization - Google, Dec 2025 (Credential ID: CRVK7DM1HRYO)",
          "• Java Programming for Beginners - IBM, Sep 2025 (Credential ID: QKQ28D53HMVA)"
        );
        break;
      case "contact":
        newHistory.push(
          "CONTACT DETAILS:",
          "• Email    : virajith404@gmail.com",
          "• Phone    : +94 70 241 2807",
          "• Location : Colombo, Sri Lanka",
          "• LinkedIn : linkedin.com/in/madhukavirajith",
          "• GitHub   : github.com/madhukavirajith",
          "• Website  : madhukavirajith.com"
        );
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "sudo coffee":
        newHistory.push(
          "☕ sudo: Compilation success!",
          "  [========================================] 100%",
          "  Dispensing double-shot espresso for guest reviewer. Enjoy reviewing Madhuka's CV!"
        );
        break;
      default:
        newHistory.push(`OS: command not found: '${cmd}'. Type 'help' for available commands.`);
    }

    newHistory.push("");
    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  // Chatbot response generator
  const triggerChatbotReply = (questionText: string, actionType: string) => {
    setChatMessages((prev) => [...prev, { sender: "user", text: questionText }]);
    setChatTyping(true);

    setTimeout(() => {
      setChatTyping(false);
      let answer = "";
      if (actionType === "internship") {
        answer =
          "Yes! Madhuka is actively seeking a Software Engineering Internship to contribute to the industry. He is an undergraduate at Cardiff Metropolitan University with hands-on experience delivering eight full-stack, AI/ML, web, desktop, and mobile applications.";
      } else if (actionType === "aiml") {
        answer =
          "Madhuka has engineered impressive AI/ML solutions: (1) NASA Mars Atmospheric Pressure Predictor reconstructing Martian pressure from 23 telemetry channels via XGBoost; (2) CarbonWise SL with XGBoost, SHAP explainability, and K-Means clustering; (3) Tutor Finder integrating Google Gemini AI with topic guardrails; and (4) Professional AI annotation experience at Innodata Inc. supporting large-scale model training.";
      } else if (actionType === "projects") {
        answer =
          "Madhuka has built 8 complete applications: 2 personal projects (Tutor Finder & LeaveTrackerPro) and 6 academic projects (NASA Mars Pressure Predictor, CarbonWise SL, Sunrise Dental Clinic, Forgotten Recipes, FitZone, and Luxe Vista Resort). Check out the Projects section for full codebases and live demos!";
      } else if (actionType === "education") {
        answer =
          "Madhuka is reading for his BSc (Hons) in Computer Software Engineering at Cardiff Metropolitan University. He previously completed his Higher Diploma in Computing & Software Engineering with a Merit grade. He also holds Google AI Essentials and IBM Java certifications.";
      } else if (actionType === "contact") {
        answer =
          "You can contact Madhuka directly via email at virajith404@gmail.com, call +94 70 241 2807, or connect on LinkedIn (linkedin.com/in/madhukavirajith) and GitHub (github.com/madhukavirajith). He is based in Colombo, Sri Lanka.";
      } else {
        answer = "I'm ready to help! You can ask about Madhuka's 8 projects, tech stack, experience, or internship availability.";
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    }, 700);
  };

  const currentThemeClasses = darkMode
    ? {
        bg: "bg-[#030712]",
        panel: "bg-white/[0.04] border-white/10",
        card: "bg-white/[0.03] border-white/10 hover:border-brand-cyan/40",
        text: "text-slate-100",
        sub: "text-slate-300",
        formInput: "bg-white/5 border-white/10 text-white focus:border-brand-cyan/50",
      }
    : {
        bg: "bg-slate-50",
        panel: "bg-white/90 border-slate-200 shadow-lg",
        card: "bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-brand-violet/40",
        text: "text-slate-900",
        sub: "text-slate-600",
        formInput: "bg-slate-50 border-slate-200 text-slate-950 focus:border-brand-violet/50",
      };

  return (
    <div className={`${currentThemeClasses.bg} min-h-screen relative font-sans transition-colors duration-300 grid-bg-overlay`}>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-pink transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Decorative Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
        <div className="absolute left-[3%] top-[8%] w-[500px] h-[500px] rounded-full bg-brand-cyan/15 dark:bg-brand-cyan/10 blur-[140px] animate-pulse-glow" />
        <div
          className="absolute right-[4%] top-[32%] w-[550px] h-[550px] rounded-full bg-brand-violet/15 dark:bg-brand-violet/10 blur-[150px] animate-pulse-glow"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="absolute left-[20%] bottom-[8%] w-[450px] h-[450px] rounded-full bg-brand-pink/15 dark:bg-brand-pink/10 blur-[130px] animate-pulse-glow"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      {/* ── Header & Navigation ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-white/10 bg-slate-50/80 dark:bg-[#030712]/75 backdrop-blur-xl transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              Madhuka Virajith
            </span>
            <span className="rounded-full bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 text-3xs font-semibold text-brand-cyan uppercase tracking-wider hidden sm:inline-block">
              SE Undergrad
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors uppercase tracking-wider"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-2 text-slate-800 dark:text-slate-100 transition hover:bg-brand-cyan hover:text-slate-950 dark:hover:bg-brand-cyan dark:hover:text-slate-950 cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-2 text-slate-800 dark:text-slate-100 md:hidden transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200 dark:border-white/10 bg-slate-100/95 dark:bg-[#030712]/95 backdrop-blur-md px-6 py-4 md:hidden"
            >
              <div className="flex flex-col gap-3.5">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-cyan transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Main Content Container ─────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── HERO SECTION ── */}
        <section id="home" className="py-16 lg:py-24 relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Software Engineering Internships
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl font-display leading-[1.08]">
                MADHUKA <span className="text-gradient">VIRAJITH</span>
              </h1>

              {/* Dynamic Subtitle typing matching CV */}
              <div className="mt-3.5 min-h-[32px] flex items-center">
                <span className="text-base sm:text-lg md:text-xl font-medium text-slate-700 dark:text-slate-200 font-mono">
                  &gt; {displayText}
                </span>
                <span className="w-2 h-5 bg-brand-cyan ml-1.5 animate-cursor-blink" />
              </div>

              {/* Exact Location & Contact Strip from CV */}
              <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-cyan" /> Colombo, Sri Lanka
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-brand-cyan" /> virajith404@gmail.com
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-brand-cyan" /> +94 70 241 2807
                </span>
              </div>

              {/* Exact CV Summary statement */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-650 dark:text-slate-300">
                Software Engineering undergraduate at <strong className="text-slate-900 dark:text-white">Cardiff Metropolitan University</strong> (BSc Hons in progress; Higher Diploma completed with <span className="text-brand-cyan font-semibold">Merit</span>) with hands-on experience building <strong className="text-slate-900 dark:text-white">eight full-stack, web, AI/ML, desktop, and mobile applications</strong>, applying knowledge to real performance problems. Seeking a Software Engineering internship to contribute to the industry.
              </p>

              {/* Key Technical Skill Chips from CV */}
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Java",
                  "Python",
                  "JavaScript",
                  "React",
                  "SQL",
                  "Data Structures & Algorithms",
                  "OOP",
                  "Git/GitHub",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 backdrop-blur-sm shadow-sm"
                  >
                    <TechIcon name={skill} size={13} />
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-pink px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] cursor-pointer"
                >
                  Explore 8 Projects <ChevronRight className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 rounded-2xl border ${currentThemeClasses.panel} px-6 py-3.5 text-sm font-semibold ${currentThemeClasses.text} transition hover:scale-[1.02] hover:bg-slate-200/50 dark:hover:bg-white/10 cursor-pointer`}
                >
                  Contact Me
                </a>

                <a
                  href="/Madhuka_Virajith_CV.pdf"
                  download
                  className={`inline-flex items-center gap-2 rounded-2xl border ${currentThemeClasses.panel} px-6 py-3.5 text-sm font-semibold ${currentThemeClasses.text} transition hover:bg-slate-200/50 dark:hover:bg-white/10 cursor-pointer`}
                >
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </div>

              {/* Social Channels with exact CV URLs */}
              <div className="mt-8 flex items-center gap-3">
                {[
                  { href: "https://github.com/madhukavirajith", icon: <Github className="h-5 w-5" />, label: "GitHub" },
                  { href: "https://linkedin.com/in/madhukavirajith", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                  { href: "mailto:virajith404@gmail.com", icon: <Mail className="h-5 w-5" />, label: "Email" },
                  { href: "tel:+94702412807", icon: <Phone className="h-5 w-5" />, label: "Phone" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    className={`rounded-2xl border ${currentThemeClasses.panel} p-3 ${currentThemeClasses.text} transition hover:scale-[1.08] hover:bg-slate-200/50 dark:hover:bg-white/10`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Profile Snapshot Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-dashed border-brand-cyan/40 dark:border-brand-cyan/60 animate-spin"
                style={{ animationDuration: "25s" }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-88 h-88 rounded-full border border-dotted border-brand-violet/40 dark:border-brand-violet/50 animate-spin"
                style={{ animationDuration: "40s", animationDirection: "reverse" }}
              />
              <div
                className={`relative overflow-hidden rounded-[32px] border ${currentThemeClasses.panel} p-3.5 shadow-2xl backdrop-blur-xl w-full max-w-[340px] bg-slate-900/10 dark:bg-white/5`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px]">
                  <img
                    src="/portrait.png"
                    alt="Madhuka Virajith Portrait"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-sm">Madhuka Virajith</p>
                    <p className="text-brand-cyan text-xs font-mono">BSc (Hons) SE • Cardiff Met</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ABOUT ME / SUMMARY SECTION ── */}
        <section id="about" className="py-20 border-t border-slate-200 dark:border-white/10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] mb-12 items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-3.5 py-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                ABOUT & BACKGROUND
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
                Building reliable software from core algorithms to production frontends
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                Software Engineering undergraduate at Cardiff Metropolitan University with practical experience developing eight full-stack web, machine learning, desktop, and mobile systems. Dedicated to writing clean, maintainable architectures with grounded data structures and dependable APIs.
              </p>
            </div>

            {/* Interactive 3D Canvas Globe */}
            <div className="flex flex-col justify-center items-center border border-slate-200/80 dark:border-white/10 rounded-2xl bg-slate-100/50 dark:bg-white/5 p-4 relative backdrop-blur-xl shadow-sm">
              <ParticleGlobe darkMode={darkMode} />
              <span className="text-3xs tracking-wider text-slate-400 font-mono mt-1">
                Colombo, Sri Lanka • UTC+5:30
              </span>
            </div>
          </div>

          {/* 4 Clean Metric & Focus Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                tag: "SYSTEMS",
                icon: <Code2 className="h-4 w-4" />,
                title: "8 Shipped Projects",
                subtitle: "Full-Stack, ML, Desktop & Mobile",
                desc: "End-to-end architectures utilizing custom data structures, RESTful APIs, and relational persistence.",
              },
              {
                num: "02",
                tag: "ACADEMICS",
                icon: <GraduationCap className="h-4 w-4" />,
                title: "Cardiff Metropolitan",
                subtitle: "BSc (Hons) in Progress",
                desc: "Completed Higher Diploma with Merit distinction; coursework focused on DSA, OOP, and system design.",
              },
              {
                num: "03",
                tag: "APPLIED ML",
                icon: <BrainCircuit className="h-4 w-4" />,
                title: "Machine Learning",
                subtitle: "XGBoost, scikit-learn & SHAP",
                desc: "Sensor telemetry reconstruction, automated imputation pipelines, and topic-constrained LLM integrations.",
              },
              {
                num: "04",
                tag: "EXPERIENCE",
                icon: <Briefcase className="h-4 w-4" />,
                title: "Work Experience",
                subtitle: "Innodata Inc. & IFG BPO",
                desc: "Quality-controlled data annotation supporting large-scale AI model training and urban data analytics.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.tag}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={`rounded-2xl border ${currentThemeClasses.card} p-5 backdrop-blur-md transition-all duration-200 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-3">
                    <span className="font-mono text-3xs font-semibold tracking-wider">
                      {card.num} // {card.tag}
                    </span>
                    <span className="text-slate-400 group-hover:text-brand-cyan transition">
                      {card.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {card.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {card.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS SHOWCASE (ALL 8 PROJECTS!) ── */}
        <section id="projects" className="py-20 border-t border-slate-200 dark:border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-3.5 py-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                PROJECTS
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
                Featured Engineering Projects
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
                Personal and academic engineering projects documented in the CV, spanning AI/ML prediction platforms, enterprise desktop tools, Java EE architectures, and MERN applications.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {(["All", "Personal", "Academic", "AI/ML"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeFilter === filter
                      ? "bg-brand-cyan text-slate-950 shadow-md font-bold"
                      : "border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-brand-cyan hover:text-brand-cyan"
                  }`}
                >
                  {filter} ({filter === "All" ? 8 : filter === "Personal" ? 2 : filter === "Academic" ? 6 : 3})
                </button>
              ))}
            </div>
          </div>

          {/* 8 Projects Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group rounded-3xl border ${currentThemeClasses.card} overflow-hidden transition-all duration-300 flex flex-col justify-between`}
              >
                {/* Visual Preview */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-900 flex items-center justify-center border-b border-slate-200 dark:border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badges on preview */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-lg bg-black/75 backdrop-blur-md px-3 py-1 text-3xs font-bold uppercase tracking-wider text-brand-cyan border border-brand-cyan/30">
                      {project.category} Project
                    </span>
                    <span className="rounded-lg bg-black/75 backdrop-blur-md px-3 py-1 text-3xs font-bold uppercase tracking-wider text-slate-300 border border-white/10">
                      {project.domain}
                    </span>
                  </div>

                  <span className="absolute bottom-3 right-4 text-3xs font-mono font-semibold text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                    {project.period}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display leading-snug">
                      {project.title}
                    </h3>

                    {/* Stack Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 px-2.5 py-1 text-3xs font-bold text-slate-700 dark:text-slate-300"
                        >
                          <TechIcon name={tech} size={11} />
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Exact CV Bullets */}
                    <div className="mt-5 space-y-2 border-t border-slate-200/50 dark:border-white/5 pt-4">
                      {project.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-650 dark:text-slate-300 leading-relaxed">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brand-cyan shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-slate-200/50 dark:border-white/5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-xl border ${currentThemeClasses.panel} px-4 py-2.5 text-xs font-semibold ${currentThemeClasses.text} hover:bg-slate-200/50 dark:hover:bg-white/10 transition`}
                    >
                      <Github className="h-4 w-4" /> Codebase
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-cyan hover:bg-brand-cyan/90 px-4 py-2.5 text-xs font-bold text-slate-950 transition shadow-sm"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PROFESSIONAL EXPERIENCE & EDUCATION SECTION ── */}
        <section id="experience" className="py-20 border-t border-slate-200 dark:border-white/10">
          <div className="max-w-3xl mb-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-3.5 py-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
              EXPERIENCE & EDUCATION
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
              Work Experience & Academic Journey
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Directly aligned with Madhuka Virajith&apos;s curriculum vitae, reflecting AI data annotation projects and Cardiff Metropolitan University degrees.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Column 1: Professional Experience */}
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <div className="rounded-xl bg-brand-cyan/15 p-2 text-brand-cyan">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Professional Experience
                </h3>
              </div>

              <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 space-y-8 py-2">
                {PROFESSIONAL_EXPERIENCES.map((exp, idx) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative pl-7"
                  >
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-cyan border-4 border-slate-50 dark:border-[#030712] animate-pulse" />
                    <div className={`rounded-3xl border ${currentThemeClasses.panel} p-6 backdrop-blur-xl`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                            {exp.role}
                          </h4>
                          <p className="text-xs font-semibold text-brand-cyan mt-0.5">{exp.company}</p>
                        </div>
                        <span className="inline-flex rounded-full bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 text-3xs font-semibold text-brand-cyan self-start">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-650 dark:text-slate-300">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Column 2: Education */}
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <div className="rounded-xl bg-brand-violet/15 p-2 text-brand-violet">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Education
                </h3>
              </div>

              <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 space-y-8 py-2">
                {EDUCATION_ITEMS.map((edu, idx) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative pl-7"
                  >
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-violet border-4 border-slate-50 dark:border-[#030712] animate-pulse" />
                    <div className={`rounded-3xl border ${currentThemeClasses.panel} p-6 backdrop-blur-xl`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                            {edu.degree}
                          </h4>
                          <p className="text-xs font-semibold text-brand-violet mt-0.5">
                            {edu.institution}
                          </p>
                          {edu.grade && (
                            <span className="inline-block mt-1 font-bold text-xs text-brand-cyan">
                              ★ {edu.grade}
                            </span>
                          )}
                        </div>
                        <span className="inline-flex rounded-full bg-brand-violet/10 border border-brand-violet/20 px-3 py-1 text-3xs font-semibold text-brand-violet self-start">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-650 dark:text-slate-300">
                        {edu.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNICAL SKILLS SECTION ── */}
        <section id="skills" className="py-20 border-t border-slate-200 dark:border-white/10">
          <div className="max-w-3xl mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-3.5 py-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              SKILLS & TOOLS
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
              Technical Competencies
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Complete catalog of languages, machine learning packages, backend frameworks, and cloud utilities practiced across all 8 projects.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
            {[
              { id: "core", label: "Core Skills (CV Summary)" },
              { id: "aiml", label: "AI & Machine Learning" },
              { id: "frameworks", label: "Frameworks & Backend" },
              { id: "cloud", label: "Databases, Cloud & DevOps" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSkillCategory(tab.id as keyof typeof SKILL_CATEGORIES)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeSkillCategory === tab.id
                    ? "bg-gradient-to-r from-brand-cyan to-brand-violet text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-brand-cyan hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_CATEGORIES[activeSkillCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className={`rounded-2xl border ${currentThemeClasses.card} p-5 backdrop-blur-xl`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TechIcon name={skill.name} size={18} />
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm font-display">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-3xs font-mono font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/20">
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS SECTION (NEW!) ── */}
        <section id="certifications" className="py-20 border-t border-slate-200 dark:border-white/10">
          <div className="max-w-3xl mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-3.5 py-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
              CREDENTIALS
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
              Industry Certifications
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Verified certifications from Google and IBM demonstrating AI fluency and foundational Java programming mastery.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-3xl border ${currentThemeClasses.card} p-7 backdrop-blur-xl relative flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cyan/15 px-3 py-1 text-2xs font-bold text-brand-cyan border border-brand-cyan/20">
                      <Award className="h-3.5 w-3.5" /> {cert.issuer}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{cert.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {cert.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {cert.details}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                  <div className="font-mono text-3xs text-slate-400">
                    Credential ID: <span className="text-slate-700 dark:text-slate-200 font-semibold">{cert.credentialId}</span>
                  </div>
                  <span className="text-3xs font-semibold uppercase text-emerald-400 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Verified
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── INTERACTIVE DEVELOPER CLI TERMINAL WIDGET ── */}
        <section id="terminal" className="py-20 border-t border-slate-200 dark:border-white/10">
          <div className="max-w-3xl mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-3.5 py-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              DEVELOPER CLI
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
              Interactive Terminal Console
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Recruiters and engineers can query Madhuka&apos;s CV directly through this command-line interface. Type <code className="text-brand-cyan font-mono bg-brand-cyan/10 px-1.5 py-0.5 rounded">help</code> to see commands.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl font-mono text-xs sm:text-sm text-slate-200"
          >
            {/* Terminal Header */}
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block" />
              </div>
              <div className="text-slate-400 text-3xs uppercase tracking-wider font-semibold flex items-center gap-1">
                <Terminal className="h-3.5 w-3.5 text-brand-cyan" /> guest@madhukavirajith:~ (CV Terminal)
              </div>
              <div className="w-12" />
            </div>

            {/* Terminal Log */}
            <div className="p-5 h-80 overflow-y-auto space-y-2 select-text bg-slate-950 text-slate-300">
              {terminalHistory.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap leading-relaxed">
                  {line.startsWith("guest@madhukavirajith:~$") ? (
                    <span>
                      <span className="text-emerald-400 font-bold hidden sm:inline">guest@madhukavirajith</span>
                      <span className="text-slate-400 font-bold hidden sm:inline">:</span>
                      <span className="text-brand-cyan font-bold">~$</span> {line.substring(25)}
                    </span>
                  ) : line.startsWith("OS:") ? (
                    <span className="text-rose-400 font-bold">{line}</span>
                  ) : line.includes("Available Commands:") || line.includes("☕ sudo:") ? (
                    <span className="text-brand-pink font-bold">{line}</span>
                  ) : line.includes("MADHUKA VIRAJITH") || line.includes("ALL 8 FEATURED PROJECTS:") ? (
                    <span className="text-brand-cyan font-bold">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleTerminalSubmit} className="bg-slate-900 border-t border-slate-800 p-4 flex items-center gap-2">
              <span className="text-emerald-400 font-bold shrink-0 hidden sm:inline">guest@madhukavirajith</span>
              <span className="text-slate-400 font-bold shrink-0 hidden sm:inline">:</span>
              <span className="text-brand-cyan font-bold shrink-0">~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'help', 'projects', 'skills', 'experience', 'education'..."
                className="bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 flex-grow font-mono text-xs sm:text-sm"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </motion.div>
        </section>

        {/* ── CONTACT FORM SECTION ── */}
        <section id="contact" className="py-20 border-t border-slate-200 dark:border-white/10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left Info Column */}
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-3.5 py-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                GET IN TOUCH
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-display">
                Let&apos;s Connect
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Madhuka is available for Software Engineering internships, full-stack development roles, and research projects. Reach out via email, phone, or send a direct message below.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    label: "Email Address",
                    value: "virajith404@gmail.com",
                    href: "mailto:virajith404@gmail.com",
                    icon: <Mail className="h-5 w-5" />,
                    canCopy: true,
                  },
                  {
                    label: "Direct Phone",
                    value: "+94 70 241 2807",
                    href: "tel:+94702412807",
                    icon: <Phone className="h-5 w-5" />,
                  },
                  {
                    label: "Location",
                    value: "Colombo, Sri Lanka",
                    href: "#",
                    icon: <MapPin className="h-5 w-5" />,
                  },
                  {
                    label: "LinkedIn Profile",
                    value: "linkedin.com/in/madhukavirajith",
                    href: "https://linkedin.com/in/madhukavirajith",
                    icon: <Linkedin className="h-5 w-5" />,
                  },
                  {
                    label: "GitHub Repositories",
                    value: "github.com/madhukavirajith",
                    href: "https://github.com/madhukavirajith",
                    icon: <Github className="h-5 w-5" />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between rounded-2xl border ${currentThemeClasses.panel} p-4.5 transition hover:scale-[1.01]`}
                  >
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-4 flex-grow"
                    >
                      <div className="rounded-xl bg-brand-cyan/15 p-3 text-brand-cyan shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-3xs font-semibold uppercase tracking-wider text-slate-400">
                          {item.label}
                        </p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                          {item.value}
                        </p>
                      </div>
                    </a>

                    {item.canCopy && (
                      <button
                        onClick={handleCopyEmail}
                        className="p-2 text-slate-400 hover:text-brand-cyan transition cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {copiedEmail ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Column */}
            <div className={`rounded-[32px] border ${currentThemeClasses.panel} p-8 backdrop-blur-xl bg-slate-900/10 dark:bg-white/5`}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                Send a Direct Message
              </h3>

              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-4 animate-bounce" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                    Thank you for reaching out! Madhuka will respond directly to your email address as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className={`w-full rounded-xl border px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 ${currentThemeClasses.formInput}`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className={`w-full rounded-xl border px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 ${currentThemeClasses.formInput}`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className={`w-full rounded-xl border px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 ${currentThemeClasses.formInput}`}
                      placeholder="Hi Madhuka, I reviewed your CV and would like to discuss a software engineering opportunity..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-pink py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-95 disabled:opacity-50 cursor-pointer"
                  >
                    {formStatus === "sending" ? "Dispatching Message..." : "Send Message"}{" "}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-200 dark:border-white/10 px-6 py-10 bg-slate-100/60 dark:bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Madhuka Virajith • Software Engineering Undergraduate
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cardiff Metropolitan University | Colombo, Sri Lanka | virajith404@gmail.com | +94 70 241 2807
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="https://github.com/madhukavirajith" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-brand-cyan">
              GitHub
            </a>
            <a href="https://linkedin.com/in/madhukavirajith" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-brand-cyan">
              LinkedIn
            </a>
            <a href="#home" className="font-bold text-brand-cyan hover:underline">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* ── RESUME BOT (FLOATING CHAT ASSISTANT) ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setChatOpen((prev) => !prev)}
          className="rounded-full bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-pink p-4 text-white shadow-2xl transition hover:scale-[1.08] relative group cursor-pointer flex items-center justify-center"
          aria-label="Toggle chat assistant"
        >
          {chatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          <span className="absolute right-full mr-3 bg-black/85 backdrop-blur-md text-white text-2xs font-bold py-1.5 px-3 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
            Chat with CV Bot!
          </span>
        </button>

        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-92 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden font-sans text-xs"
            >
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="font-bold font-display">Madhuka CV Assistant</h4>
                    <p className="text-3xs text-slate-400">Trained on attached CV details</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 h-64 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed font-medium ${
                        msg.sender === "user"
                          ? "bg-brand-cyan text-slate-950 rounded-tr-none"
                          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {chatTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-slate-400 shadow-sm flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                <div ref={chatbotMessagesEndRef} />
              </div>

              {/* Suggested Questions */}
              <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                <p className="text-3xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Ask about Madhuka:
                </p>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => triggerChatbotReply("Are you seeking an internship?", "internship")}
                    className="w-full text-left rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-2 hover:bg-brand-cyan/10 hover:border-brand-cyan dark:hover:bg-brand-cyan/10 dark:hover:border-brand-cyan text-slate-700 dark:text-slate-300 transition font-medium cursor-pointer"
                  >
                    💼 Are you seeking an internship?
                  </button>
                  <button
                    onClick={() => triggerChatbotReply("Tell me about your 8 projects", "projects")}
                    className="w-full text-left rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-2 hover:bg-brand-cyan/10 hover:border-brand-cyan dark:hover:bg-brand-cyan/10 dark:hover:border-brand-cyan text-slate-700 dark:text-slate-300 transition font-medium cursor-pointer"
                  >
                    🚀 Tell me about your 8 projects
                  </button>
                  <button
                    onClick={() => triggerChatbotReply("What AI/ML models have you built?", "aiml")}
                    className="w-full text-left rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-2 hover:bg-brand-cyan/10 hover:border-brand-cyan dark:hover:bg-brand-cyan/10 dark:hover:border-brand-cyan text-slate-700 dark:text-slate-300 transition font-medium cursor-pointer"
                  >
                    🤖 What AI/ML models have you built?
                  </button>
                  <button
                    onClick={() => triggerChatbotReply("What are your education & certifications?", "education")}
                    className="w-full text-left rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-2 hover:bg-brand-cyan/10 hover:border-brand-cyan dark:hover:bg-brand-cyan/10 dark:hover:border-brand-cyan text-slate-700 dark:text-slate-300 transition font-medium cursor-pointer"
                  >
                    🎓 Education & Certifications
                  </button>
                  <button
                    onClick={() => triggerChatbotReply("How can I contact you?", "contact")}
                    className="w-full text-left rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-2 hover:bg-brand-cyan/10 hover:border-brand-cyan dark:hover:bg-brand-cyan/10 dark:hover:border-brand-cyan text-slate-700 dark:text-slate-300 transition font-medium cursor-pointer"
                  >
                    ✉️ How can I contact you?
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}