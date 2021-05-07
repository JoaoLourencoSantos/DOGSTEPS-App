package br.com.dogsteps.enums;

public enum EMood {
	CALMO(1, "O pet é calmo"),
	BRINCALHAO(2,"O pet é brincalhão"),
	PREGUICOSO(3, "O pet é preguiçoso"),
	AGRESSIVO(4, "O pet é agressivo");

	private int id;
	private String descricao;

	EMood(int id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}

	public int getId() {
		return id;
	}

	public String getDescricao() {
		return descricao;
	}

}
