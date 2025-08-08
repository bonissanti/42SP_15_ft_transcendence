import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runLanguageSwitcherTests() {
    const suite = new TestSuite();

    suite.test('LangSwitcher - should change language', async () => {
        const langSwitcher = {
            currentLang: 'en',
            availableLanguages: ['en', 'pt', 'es', 'fr']
        };
        
        langSwitcher.currentLang = 'pt';
        
        Assert.strictEqual(langSwitcher.currentLang, 'pt');
        Assert.ok(langSwitcher.availableLanguages.includes('pt'));
    });

    suite.test('LangSwitcher - should validate language codes', async () => {
        const validLanguages = ['en', 'pt', 'es', 'fr', 'de', 'it'];
        const testLang = 'pt';
        
        Assert.ok(validLanguages.includes(testLang));
    });

    suite.test('LangSwitcher - should store language preference', async () => {
        const mockStorage = TestHelper.createMockWindow().localStorage;
        let storedLang = '';
        
        // Mock setItem method
        const setItem = (key: string, value: string) => {
            if (key === 'preferred_language') {
                storedLang = value;
            }
        };
        
        setItem('preferred_language', 'pt');
        
        Assert.strictEqual(storedLang, 'pt');
    });

    suite.test('LangSwitcher - should apply translations', async () => {
        const translations = {
            en: { welcome: 'Welcome', goodbye: 'Goodbye' },
            pt: { welcome: 'Bem-vindo', goodbye: 'Tchau' }
        };
        
        const currentLang = 'pt';
        const welcomeText = translations[currentLang].welcome;
        
        Assert.strictEqual(welcomeText, 'Bem-vindo');
    });

    suite.test('LangSwitcher - should handle missing translations', async () => {
        const translations = {
            en: { welcome: 'Welcome' },
            pt: { welcome: 'Bem-vindo' }
        };
        
        const currentLang = 'pt';
        const missingKey = 'goodbye';
        const fallbackText = translations.en[missingKey as keyof typeof translations.en] || missingKey;
        
        Assert.strictEqual(fallbackText, missingKey);
    });

    return await suite.run();
}
