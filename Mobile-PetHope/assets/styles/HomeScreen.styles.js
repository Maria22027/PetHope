import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 25,
    paddingTop: 20,
    paddingBottom: 25,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E53935',
    marginTop: 8,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#E53935',
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    paddingVertical: 20,
  },
  
  // Cards de Pet
  petCard: {
    width: 170,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  petCardImage: {
    width: '100%',
    height: 170,
    backgroundColor: '#f0f0f0',
  },
  petCardPlaceholder: {
    width: '100%',
    height: 170,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petCardName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    padding: 12,
    paddingBottom: 5,
  },
  petCardInfo: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  // Cards de Campanha
  campaignCard: {
    width: 320,
    backgroundColor: '#E53935',
    borderRadius: 15,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  campaignCardImage: {
    width: 120,
    height: 140,
    backgroundColor: '#c62828',
  },
  campaignCardPlaceholder: {
    width: 120,
    height: 140,
    backgroundColor: '#c62828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  campaignCardContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  campaignCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  campaignCardDescription: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },
});
