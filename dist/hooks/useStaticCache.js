"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStaticCache = void 0;
const react_1 = require("react");
const generateServiceWorker_1 = require("../utils/generateServiceWorker");
const useStaticCache = (config) => {
    const [registration, setRegistration] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
            if ('serviceWorker' in navigator) {
                try {
                    // Generate service worker script
                    const swScript = (0, generateServiceWorker_1.generateServiceWorkerScript)(config);
                    const blob = new Blob([swScript], { type: 'text/javascript' });
                    const swUrl = URL.createObjectURL(blob);
                    // Register service worker
                    const reg = yield navigator.serviceWorker.register(swUrl, { scope: '/' });
                    setRegistration(reg);
                    setIsReady(true);
                    // Cleanup
                    URL.revokeObjectURL(swUrl);
                }
                catch (err) {
                    setError(err instanceof Error ? err : new Error('Failed to register service worker'));
                }
            }
            else {
                setError(new Error('Service workers not supported'));
            }
        });
        initialize().then();
    }, [config]);
    return { isReady, error, registration };
};
exports.useStaticCache = useStaticCache;
